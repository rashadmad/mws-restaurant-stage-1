const server = require('server');
const { get, post } = server.router;

server({ port: 8000 }, [
  get('/', ctx => 'Hello world'),
  post('/', ctx => console.log(ctx.data))
]);
