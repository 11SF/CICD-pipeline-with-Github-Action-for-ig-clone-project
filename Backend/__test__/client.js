import supertest from 'supertest';
import { addMsg } from 'jest-html-reporters/helper';
// import { toCurl } from 'request-to-curl';

const request = supertest.agent('http://localhost:3001/api');
  request.on('response', async (response) => {
    const { request, body, statusCode, headers } = response;
    const data = {
      request: {
        header: request._header,
        url: request.url,
        body: request._data,
        method: request.method,
        // curl: request.req.toCurl()
      },
      response: {
        header: headers,
        status: statusCode,
        body,
      }
    }
    await addMsg(JSON.stringify(data, null, 2));
});

export default request;