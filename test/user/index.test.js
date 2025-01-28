const request = require('supertest');
const app = require('../../app');

describe('API Tests', () => {

    jest.mock('../../User', () => {
        const mockController = {
            findUser: jest.fn((req, res) => res.status(200).json({ message: 'findUser called' })),
            createUser: jest.fn((req, res) => res.status(201).json({ message: 'createUser called' })),
            updateUser: jest.fn((req, res) => res.status(200).json({ message: 'updateUser called' })),
            deleteUser: jest.fn((req, res) => res.status(204).send()),
            loginUser: jest.fn((req, res) => res.status(200).json({ message: 'loginUser called' }))
        };
        return { UserController: mockController };
    });

//   test('GET /api/resource should return 200 and a message', async () => {
//     const response = await request(app).get('/');
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Hello, world!');
//   });

//   test('POST /api/resource should return 201 when valid data is sent', async () => {
//     const response = await request(app)
//       .post('/api/resource')
//       .send({ name: 'Test Resource' });

//     expect(response.status).toBe(201);
//     expect(response.body.name).toBe('Test Resource');
//   });

//   test('POST /api/resource should return 400 if name is missing', async () => {
//     const response = await request(app).post('/api/resource').send({});
//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Name is required');
//   });

});
