const server = require('server');
const { get, post } = server.router;

server({ port: process.env.PORT || 8000 }, [
  get('/', () => render('index.html')),
  post('/', ctx => {
    console.log(ctx.data);
    return redirect('/');
  })
]);
