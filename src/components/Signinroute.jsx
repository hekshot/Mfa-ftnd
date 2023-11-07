import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isMfaEnab } from '../auth';

const Signinroute = () => {

    if(isMfaEnab()){
        return <Outlet/>
    }else{
        return <Navigate to={"/signin"}/>;
    }

}

export default Signinroute