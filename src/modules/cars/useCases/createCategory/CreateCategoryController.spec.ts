import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

const userData = {
  email: 'luciano@email.com',
  password: 'mypass',
};

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();

    const id = uuid();
    const hashPassword = await hash(userData.password, 8);

    await connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
    values('${id}', 'Luciano', 'luciano@email.com', 'AA-DD-14' , '${hashPassword}', true, 'now()')
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'luciano@email.com', password: 'mypass' });

    const { token } = responseToken.body;

    console.log(token);

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'My Category',
        description: 'My Category test',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with same name', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'luciano@email.com', password: 'mypass' });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'My Category',
        description: 'My Category test',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
