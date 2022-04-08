import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function ParentComponent() {
    let [isOpen, setIsOpen] = useState(false)

    const [state,setState]=useState({
        name:'',
        surname:'',
        phone:'',
        address:'',
        city:'',
        state:'',
        country:'',
        national_id:'',
    })

    const [errors,setErrors]=useState({})

    function closeModal() {
        setState({
            name:'',
            surname:'',
            phone:'',
            address:'',
            city:'',
            state:'',
            country:'',
            national_id:'',
        })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/parents',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['parents'])
            setErrors({})
            success('You have successfully add a new parent entry to the list, congrats!')
            closeModal()
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
            warning()
        },
    })


    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const submit=()=>{
        mutation.mutate(state)
    }




    return (
        <>
            <button type={'button'} onClick={openModal} className="focus:outline-none text-p-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed bg-black bg-opacity-25 inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full font-mont max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl text-p-100 font-light"
                                >
                                    Parent Details
                                </Dialog.Title>
                                <div className="mt-5 grid grid-cols-2 gap-5">
                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">First Name</span>
                                            <input
                                                type="text"
                                                placeholder={'Name'}
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

                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">Last Name</span>
                                            <input
                                                type="text"
                                                placeholder={'Surname'}
                                                name={'surname'}
                                                value={state.surname}
                                                onChange={handleChange}
                                                className={`inp ${errors.surname ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.surname && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.surname[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">National ID</span>
                                            <input
                                                type="text"
                                                placeholder={'National ID (Dzechitupa)'}
                                                name={'national_id'}
                                                value={state.national_id}
                                                onChange={handleChange}
                                                className={`inp ${errors.national_id ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.national_id && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.national_id[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">Phone</span>
                                            <input
                                                type="text"
                                                placeholder={'eg 0782 *** ***'}
                                                name={'phone'}
                                                value={state.phone}
                                                onChange={handleChange}
                                                className={`inp ${errors.phone ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.phone && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.phone[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div className={'col-span-2'}>
                                        <label>
                                            <span className="block text-xs mb-3">Address</span>
                                            <textarea
                                                rows={5}
                                                name={'address'}
                                                value={state.address}
                                                onChange={handleChange}
                                                className={`inp ${errors.address ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.address && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.address[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">City</span>
                                            <input
                                                type="text"
                                                name={'city'}
                                                value={state.city}
                                                onChange={handleChange}
                                                className={`inp ${errors.city ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.city && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.city[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">State</span>
                                            <input
                                                type="text"
                                                name={'state'}
                                                value={state.state}
                                                onChange={handleChange}
                                                className={`inp ${errors.state ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.state && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.state[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">Country</span>
                                            <input
                                                type="text"
                                                name={'country'}
                                                value={state.country}
                                                onChange={handleChange}
                                                className={`inp ${errors.country ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.country && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.country[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <button
                                        type="button"
                                        className="btn bg-p-100 text-white"
                                        onClick={submit}
                                    >
                                        {
                                            mutation.isLoading ? 'Saving new entry' : 'Save new entry'
                                        }
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

