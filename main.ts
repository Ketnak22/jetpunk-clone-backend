import express from 'express';
import apiRouter from './routes/apiRouter.ts';

const app = express();

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});