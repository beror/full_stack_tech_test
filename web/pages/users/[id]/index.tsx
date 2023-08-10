import React from 'react';

import {useGetUserByIdQuery} from "@/services/users/users";
import {useRouter} from "next/router";
import {Card} from "@nextui-org/card";
import {Avatar, CardBody, Skeleton} from "@nextui-org/react";

const UserPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useGetUserByIdQuery(Number(id));

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
            <div className="h-screen flex items-center justify-center">
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
            </div>
        )
    }

    if(!data){
       return (
           <div className="h-screen flex items-center justify-center">
               <Card>
                   <CardBody>
                       <p>There is no such user</p>
                   </CardBody>
               </Card>
           </div>
       )
    }

    return (
        <Card>
            <Avatar src={data.avatar} alt={`${data.name}'s avatar`} />
            <h3>{data.name}</h3>
            <p>{data.email}</p>
        </Card>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: {} };
};

export default UserPage;