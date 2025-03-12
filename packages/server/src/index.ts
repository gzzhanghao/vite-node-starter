import http from 'node:http';
import { type AddressInfo } from 'node:net';

import Router from '@koa/router';
import { name } from '@vite-node-starter/lib';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';

async function run() {
  const app = new Koa();
  const router = new Router();

  const server = http.createServer(app.callback());

  app.use(KoaLogger());
  app.use(bodyParser());

  router.get('/api/hello', (ctx) => {
    ctx.body = `Hello, ${name}`;
  });

  app.use(router.routes()).use(router.allowedMethods());

  import.meta.hot?.accept(() => {
    server.close();
    console.log('Server closed due to hot reload');
  });
  server.listen(6857).on('listening', () => {
    const addr = server.address() as AddressInfo;
    console.log(`Server listening at http://127.0.0.1:${addr.port}/`);
  });
}

run();
