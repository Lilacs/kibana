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

import expect from 'expect.js';
import { AggType } from '../../../agg_types/agg_type';
import { makeFakeXAspect } from '../_fake_x_aspect';

describe('makeFakeXAspect', function () {

  it('creates an object that looks like an aspect', function () {
    const aspect = makeFakeXAspect();

    expect(aspect)
      .to.have.property('i', -1)
      .and.have.property('aggConfig');

    expect(aspect.aggConfig)
      .to.have.property('fieldFormatter')
      .and.to.have.property('type');

    expect(aspect.aggConfig.type)
      .to.be.an(AggType)
      .and.to.have.property('name', 'all')
      .and.to.have.property('title', 'All docs')
      .and.to.have.property('hasNoDsl', true);

    expect(aspect.params).to.have.property('defaultValue', '_all');
  });
});
