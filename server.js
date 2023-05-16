const http = require('http');
require('dotenv').config();

const bootstrap = require('./app');

async function startServer() {
  const app = await bootstrap();
  const PORT = process.env.PORT || 8000;

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
