import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isMfa } from '../auth';

const Signuproute = () => {

    if(isMfa()){
        return <Outlet/>
    }else{
        return <Navigate to={"/signup"}/>;
    }

}

export default Signuproute