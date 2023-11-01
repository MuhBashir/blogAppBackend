const mongoose = require('mongoose');
const supertest = require('supertest');
const { app } = require('../index');

const api = supertest(app);
test('blog returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
