import { Router } from 'express';

import { getUsers, getUserById, createUser } from '../controllers/user.js'

export const userRouter = Router();

userRouter.route('/users')
    .get(getUsers)
    .post(createUser);

userRouter.route('/users/:id')
    .get(getUserById);