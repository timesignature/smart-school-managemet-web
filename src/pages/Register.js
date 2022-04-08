import {Link, useHistory} from "react-router-dom";
import {useState} from "react";
import {useMutation} from "react-query";
import http from "../http";
import {success, warning} from "../components/ToastComponent";
import AuthLayout from "../Layout/AuthLayout";

export default function Register(){

    const [state,setState]=useState({
        name:'',
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
    const mutation=useMutation(values=>http.post('/sign-up',values).then(res=>res.data),{
        onSuccess:()=>{
            success('You have successfully created your account please check your email address, congrats!')
            setErrors({})
            setState({
                name:'',
                email:'',
                password:'',
            })
            h.push('/login')
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
                        Account Registration
                    </span>
                        <div className='mt-10'>
                            <label>
                        <span className="block text-xs mb-3">
                            Name
                        </span>
                                <input
                                    type="text"
                                    placeholder={'Username'}
                                    name={'name'}
                                    value={state.name}
                                    onChange={handleChange}
                                    className={`inp ${errors.name ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.name && (
                                        <span className="block text-xs text-red-600 mt-3">
                                        {
                                            errors.name[0]
                                        }
                                    </span>
                                    )
                                }
                            </label>
                        </div>

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
                                    mutation.isLoading ? '...Registering' : 'Register'
                                }
                            </button>
                        </div>

                        <div className="mt-10">
                            <Link to={'/login'}>
                            <span className="block text-sm text-p-100">
                                Already have an account ?, sign in
                            </span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthLayout>
    )
}
