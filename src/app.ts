import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
const app = express();



app.use(express.json({
  type: ['application/json', 'text/plain']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.use(cors());



app.get('/', (req, res) => res.send('Hello World!'));

export default app;
