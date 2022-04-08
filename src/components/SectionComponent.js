import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function SectionComponent() {
    let [isOpen, setIsOpen] = useState(false)

    const [state,setState]=useState({
        title:''
    })

    const [errors,setErrors]=useState({})

    function closeModal() {
        setState({
            title:''
        })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/section',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['section'])
            setErrors({})
            success('You have successfully add a class room to the list, congrats!')
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
                            <div className="inline-block w-full font-mont max-w-lg p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl text-p-100 font-light"
                                >
                                    Class / Form
                                </Dialog.Title>
                                <div className="mt-5">
                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">Title</span>
                                            <input
                                                type="text"
                                                placeholder={'Class Name'}
                                                name={'title'}
                                                value={state.title}
                                                onChange={handleChange}
                                                className={`inp ${errors.title ? 'border-red-600' : 'border-zinc-200'}`}
                                            />
                                            {
                                                errors.title && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.title[0]
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
