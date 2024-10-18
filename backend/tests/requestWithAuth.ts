import request from 'supertest';
import app from '../src/app';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const requestWithAuth = (method: HttpMethod, url: string): request.Test => {
  return request(app)[method](url).set('Authorization', `Bearer ${global.jwtToken}`);
};
