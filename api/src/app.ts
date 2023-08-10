import express, { Application } from 'express';
import cors from 'cors';
// import entitiesRouter from './clean_me.js';  // import entities router
import { userRouter } from './routes/user.js';

const app: Application = express();
app.use(express.json(), cors());

const PORT: number = 3001;

app.use('/', userRouter);  // use entities router at path '/entities'

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
