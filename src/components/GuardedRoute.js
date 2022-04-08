import React,{useState} from 'react';
import { Route, Redirect } from "react-router-dom";
import {TOKEN_LABEL} from "../config";




const GuardedRoute = ({ component: Component, auth, ...rest }) => {


    const [token]=useState(()=>{
        const token=localStorage.getItem(TOKEN_LABEL)
        if (token==null){
            return false
        }
        return true
    })


    return (

        <Route {...rest} render={(props) => (
            token === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default GuardedRoute;
