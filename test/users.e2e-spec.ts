import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeORMExceptionFilter } from './../src/filters/typeorm-exceptions.filter';
import { UserDTO } from 'src/users/user.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new TypeORMExceptionFilter());
    await app.init();
  });

  it('users CRUD', async () => {

    const server = request(app.getHttpServer());

    const currentGetAllRequest = await server.get('/users').expect(200);
    const currentSize = currentGetAllRequest.body.length;

    const newUser: UserDTO = {
      name: 'Mateo',
      password: 'password'
    }
    
    const newUserRequest = await server.post('/users').type('form')
    .send(newUser).expect(201);
    expect(newUserRequest.body.name).toEqual(newUser.name);

    await server.post('/users').type('form')
      .send(newUser).expect(400);
    
    expect(newUserRequest.body.name).toBe(newUser.name);
    const postNewRequest = await server.get('/users').expect(200);
    const postNewSize = postNewRequest.body.length;
    expect(postNewSize).toBe(currentSize + 1);

    const id = newUserRequest.body.id;
    const getUserByIdRequest = await server.get(`/users/${id}`).expect(200);
    expect(getUserByIdRequest.body.id).toBe(id);

    const updateUser: UserDTO = {
      id: newUserRequest.body.id,
      name: 'Mateo Aguilera',
      password: 'password'
    }
    const updateUserRequest = await server.put(`/users/${updateUser.id}`)
    .expect(200).type('form').send(updateUser);
    expect(updateUserRequest.body.name).toEqual(updateUser.name);

    await server.delete(`/users/${updateUser.id}`)
    .expect(200);
    const postDeleteGetAllRequest = await server.get('/users')
    .expect(200);
    const postDeleteSize = postDeleteGetAllRequest.body.length;
    expect(postDeleteSize).toBe(currentSize);
  });
});