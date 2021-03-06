/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const resolve = require('path').resolve;

const pluginConfig = require('./plugin_config');

function babelRegister() {
  const plugin = pluginConfig();

  try {
    // add support for moved babel-register source: https://github.com/elastic/kibana/pull/13973
    require(resolve(plugin.kibanaRoot, 'src/setup_node_env/babel_register')); // eslint-disable-line import/no-dynamic-require
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      require(resolve(plugin.kibanaRoot, 'src/optimize/babel/register')); // eslint-disable-line import/no-dynamic-require
    } else {
      throw error;
    }
  }
}

function resolveKibanaPath(path) {
  const plugin = pluginConfig();
  return resolve(plugin.kibanaRoot, path);
}

function createToolingLog(level) {
  // The tooling log location changed in 6.1.0, see https://github.com/elastic/kibana/pull/14890
  const utils = require(resolveKibanaPath('src/utils')); // eslint-disable-line import/no-dynamic-require
  if (utils.createToolingLog) return utils.createToolingLog(level);
  return require(resolveKibanaPath('src/dev')) // eslint-disable-line import/no-dynamic-require
    .createToolingLog(level);
}

function readFtrConfigFile(log, path, settingOverrides) {
  return require(resolveKibanaPath('src/functional_test_runner')) // eslint-disable-line import/no-dynamic-require
    .readConfigFile(log, path, settingOverrides);
}

module.exports = {
  babelRegister: babelRegister,
  resolveKibanaPath: resolveKibanaPath,
  createToolingLog: createToolingLog,
  readFtrConfigFile: readFtrConfigFile,
};
