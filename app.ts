import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 1111;

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`The Server is now run on http://localhost:${port}`);
});