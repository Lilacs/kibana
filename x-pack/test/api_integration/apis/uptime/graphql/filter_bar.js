/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import expect from 'expect.js';
import { getFilterBarQueryString } from '../../../../../plugins/uptime/public/components/queries/filter_bar/get_filter_bar';
import filterList from './fixtures/filter_list';

export default function ({ getService }) {
  describe('filterBar query', () => {
    const supertest = getService('supertest');

    it('returns the expected filters', async () => {
      const getFilterBarQuery = {
        operationName: 'FilterBar',
        query: getFilterBarQueryString,
        variables: { dateRangeStart: 1547805782000, dateRangeEnd: 1547852582000 },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getFilterBarQuery });
      expect(data).to.eql(filterList);
    });
  });
}
