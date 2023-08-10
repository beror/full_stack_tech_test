import fs from 'fs/promises';
import { Request, Response} from 'express';

import type { IUser } from '../types/user';

const usersFolder = 'data/users';

const getUsersFromFiles = async () => {
    const userFileNames = await fs.readdir(usersFolder, 'utf8');
    const users: IUser[] = [];

    const userFileContents = await Promise.all(
        userFileNames.map(n => fs.readFile(`${usersFolder}/${n}`, 'utf8'))
    );
    userFileContents.forEach(fileContent => {
        const user: IUser = JSON.parse(fileContent);
        users.push(user);
    });

    return users;
};

export const getUsers = 
    async (req: Request, res: Response) => {
        try {
            const users = await getUsersFromFiles();

            res.status(200).json(users);
        } catch (error) {
            res.status(500).end('Something went wrong with the server');
            console.error('Error:', error);
        }
    };

export const getUserById =
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userFileContent = await fs.readFile(`data/users/${id}.json`, 'utf8');
            const user = JSON.parse(userFileContent);
            
            res.status(200).json(user).end();
        } catch (error) {
            res.status(500).end('Something went wrong with the server');
            console.error('Error:', error);
        }
    };

export const createUser =
    async (req: Request, res: Response) => {
        try {
            const newUser = req.body;
            const newStringifiedUser = JSON.stringify(req.body, null, 2);
            const newUserId = Date.now();

            await fs.writeFile(`data/users/${newUserId}.json`, newStringifiedUser);

            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).end('Something went wrong with the server');
            console.error('Error:', error);
        }
    };