import express, { Application, Request, Response, raw } from 'express';
import fs from 'fs/promises';
import entitiesRouter from './clean_me.js';  // import entities router

const app: Application = express();

app.use(express.json());

const PORT: number = 3001;

app.use('/', entitiesRouter);  // use entities router at path '/entities'

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

entitiesRouter.route('/users')
    .get(async (req: Request, res: Response) => {
        try {
            const rawUsersJson = await fs.readFile('../data/users/1.json');
            const users = JSON.stringify(rawUsersJson);

            res.status(200).json(users);
        } catch (error) {
            res.status(500).end('Something went wrong with the server');
        }
    })
    .post(async (req: Request, res: Response) => {
        try {
            const newUser = req.body;
            const stringifiedBody = JSON.stringify(newUser);
            fs.writeFile(`../data/users/${newUser.id}.json`, stringifiedBody);

            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).end('Something went wrong with the server');
        }
    });

entitiesRouter.route('/users/:id')
    .get(async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await fs.readFile(`../data/users/${id}.json`);
            
            res.status(200).json(user).end();
        } catch (error) {
            res.status(500).end('Something went wrong with the server');
        }
    });

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
