const request = require('supertest');
const { server } = require('../app');

afterAll((done) => {
    server.close(done);
});

describe('Test the app overall connectivity', () => {
    it('should return home message', async () => {
        const response = await request(server).get('/home');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('welcome');
    });
});
