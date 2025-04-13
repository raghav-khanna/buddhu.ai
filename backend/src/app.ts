import createError from 'http-errors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import { auth } from 'express-openid-connect';
import connectDB from './config/database';
import path from 'path';

const envPath = path.join(__dirname, '../.env');
console.log(`Loading environment variables from ${envPath}`);
dotenv.config({ path: path.join(__dirname, './.env') });
import { handleError } from './helpers/error';
import httpLogger from './middlewares/httpLogger';
import router from './routes/index';

const app: express.Application = express();

connectDB();
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET, // Secret from .env
  baseURL: process.env.AUTH0_BASE_URL, // Base URL from .env
  clientID: process.env.AUTH0_CLIENT_ID, // Client ID from .env
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL // Issuer Base URL from .env
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use('/api', router);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};
app.use(errorHandler);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
