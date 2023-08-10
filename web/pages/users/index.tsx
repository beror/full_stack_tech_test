import React from 'react';
import {
    useCreateUserMutation,
    useGetListOfUsersQuery
} from "@/services/users/users";

import {
    Button, Modal,
    ModalBody, ModalContent,
    ModalFooter, ModalHeader,
    useDisclosure, Skeleton,
    CardBody, Input,
} from "@nextui-org/react";
import {User} from "@nextui-org/user";
import {Card} from "@nextui-org/card";
import {useRouter} from "next/router";
import {IUser} from "@/types/users";
import * as Yup from 'yup';
import { useFormik } from 'formik';

const UsersPage = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { data, error, isLoading } = useGetListOfUsersQuery(undefined);
    const [createUser, user] = useCreateUserMutation(undefined);
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        avatar: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            avatar: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: createUser,
    });

    const createUserHandler = () => {
        createUser({
            name: formik.values.name,
            email: formik.values.email,
            avatar: formik.values.avatar,
        })
        formik.resetForm();
    }

    if(error){
        return (
            <div className="h-screen flex items-center justify-center">
                <Card>
                    <CardBody>
                        <p>Oops, something is going wrong</p>
                    </CardBody>
                </Card>
            </div>
        )
    }

    if(isLoading){
        return  (
            <div className='p-10'>
                <div className="max-w-[300px] w-full flex items-center gap-3 pb-10">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg"/>
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                    </div>
                </div>
                <div className="max-w-[300px] w-full flex items-center gap-3 pb-10">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg"/>
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                    </div>
                </div>
                <div className="max-w-[300px] w-full flex items-center gap-3 pb-10">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg"/>
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                    </div>
                </div>
            </div>
        )
    }

    if(!data || data.length === 0){
        return (
            <div className="h-screen flex items-center justify-center">
                <Card>
                    <CardBody>
                        <p>There are no users yet</p>
                    </CardBody>
                </Card>
            </div>
        )
    }

    const moveToUserPage = (id: number) => {
        router.push(`/users/${id}`)
    }

    const renderUser = ({id, name, email, avatar}:IUser) => (
        <User
            key={id}
            name={name}
            description={email}
            avatarProps={{
                src: avatar
            }}
            className='pb-10'
            onClick={() =>moveToUserPage(id)}
        />
    )



    return (
        <div>
            <Button onPress={onOpen}>Open Modal</Button>
            <div className='p-10'>
                {data.map(renderUser)}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <Input
                                    value={formik.values.name}
                                    onChange={formik.handleChange('name')}
                                    onBlur={formik.handleBlur('name')}
                                    label="Name"
                                    placeholder="Enter your name"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div style={{ color: 'red' }}>{formik.errors.name}</div>
                                )}

                                <Input
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div style={{ color: 'red' }}>{formik.errors.email}</div>
                                )}

                                <Input
                                    value={formik.values.avatar}
                                    onChange={formik.handleChange('avatar')}
                                    onBlur={formik.handleBlur('avatar')}
                                    label="Avatar"
                                    placeholder="Enter your avatar link"
                                />
                                {formik.touched.avatar && formik.errors.avatar && (
                                    <div style={{ color: 'red' }}>{formik.errors.avatar}</div>
                                )}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button onClick={() => {
                                    onClose();
                                    createUserHandler();
                                }} type='submit' color="primary">
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UsersPage;