import {Link, useHistory} from "react-router-dom";
import {useState} from "react";
import {useMutation} from "react-query";
import http from "../http";
import {success, warning} from "../components/ToastComponent";
import AuthLayout from "../Layout/AuthLayout";
import {TOKEN_LABEL} from "../config";

export default function Login(){

    const [state,setState]=useState({
        email:'',
        password:'',
    })

    const [errors,setErrors]=useState({})


    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()
    const mutation=useMutation(values=>http.post('/login',values).then(res=>res.data),{
        onSuccess:(data)=>{
            localStorage.setItem(TOKEN_LABEL,data)
            success('You have successfully been logged in to smart college, congrats!')
            setErrors({})
            setState({
                email:'',
                password:'',
            })
            h.push('/')
        },
        onError:(e)=>{
            warning()
            setErrors(e.response.data.errors || {})
        },
    })


    const submit=()=>{
        mutation.mutate(state)
    }


    return (
        <AuthLayout>
            <div className={'min-h-screen p-20 bg-zinc-100 flex flex-col items-center justify-center font-mont overflow-y-hidden'}>
                <div className="w-1/3 bg-white p-10 overflow-y-auto">

                    <div>
                        <span className="block text-2xl font-light">
                            Smart College Management System
                        </span>
                        <span className="block mt-3 text-xs">
                            Login to your account
                        </span>

                        <div className='mt-10'>
                            <label>
                        <span className="block text-sm mb-3">
                            Email Address
                        </span>
                                <input
                                    type="text"
                                    placeholder={'Email Address'}
                                    name={'email'}
                                    value={state.email}
                                    onChange={handleChange}
                                    className={`inp ${errors.email ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.email && (
                                        <span className="block text-xs text-red-600 mt-3">
                                        {
                                            errors.email[0]
                                        }
                                    </span>
                                    )
                                }
                            </label>
                        </div>

                        <div className='mt-10'>
                            <label>
                        <span className="block text-sm mb-3">
                            Password
                        </span>
                                <input
                                    type="password"
                                    placeholder={'8+ character password'}
                                    name={'password'}
                                    value={state.password}
                                    onChange={handleChange}
                                    className={`inp ${errors.password ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.password && (
                                        <span className="block text-xs text-red-600 mt-3">
                                        {
                                            errors.password[0]
                                        }
                                    </span>
                                    )
                                }
                            </label>
                        </div>

                        <div className="mt-10">
                            <button onClick={submit} className="w-full py-4 text-sm bg-p-100 focus:outline-none rounded-lg text-white">
                                {
                                    mutation.isLoading ? '...Logging in' : 'Login'
                                }
                            </button>
                        </div>

                        <div className="mt-10">
                            <Link to={'/register'}>
                            <span className="block text-sm text-p-100">
                                dont have an account?, sign up
                            </span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthLayout>
    )
}
