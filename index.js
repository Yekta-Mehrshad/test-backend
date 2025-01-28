const http   = require('http'  );
const app    = require('./app' );
const dotenv = require('dotenv');
dotenv.config();
const server = http.createServer(app);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

server.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
