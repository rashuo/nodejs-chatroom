import http from 'http';
import assert from 'mocha';

import '../lib/index.js';

describe('Example Node Server', () => {
    it('should retur 200', done => {
        http.get('http://127.0.0.1:8000', res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});