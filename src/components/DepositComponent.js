import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function DepositComponent({setDeposit,isDeposit=true,student,fee}) {
    let [isOpen, setIsOpen] = useState(false)
    const [state,setState]=useState(0)
    const [method,setMethod]=useState('')
    const [errors,setErrors]=useState({})
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const queryClient=useQueryClient()
    const mutation=useMutation(value=>http.post(isDeposit ? '/util' : '/payments',value).then(res=>res.data),{
        onSuccess:async()=>{
            if(isDeposit){
                setDeposit(state)
            }

            await queryClient.invalidateQueries(['payments',fee])
            await queryClient.invalidateQueries(['fee',fee])

            success('its a success!!!, congrats')
            closeModal()

        },
        onError:(e)=>{
            warning()
            setErrors(e.response.data.errors || {})
        },
    })


    const submit=()=>{
        mutation.mutate({
            deposit:state,
            type:method,
            fee,
            student
        })
    }






    return (
        <>

            <span className='cursor-pointer' onClick={openModal}>Request a deposit</span>

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
                                    Fees Deposit
                                </Dialog.Title>
                                <div className="mt-5">
                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">Amount</span>
                                            <input
                                                type="number"
                                                placeholder={'Deposited Amount'}
                                                name={'amount'}
                                                value={state}
                                                onChange={val=>setState(val.target.value)}
                                                className={`inp ${errors.deposit ? 'border-red-600' : 'border-zinc-200'}`}
                                            />

                                            {
                                                errors.deposit && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.deposit[0]
                                                        }
                                                    </span>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div className='mt-10'>
                                        <label>
                                            <span className="block text-xs mb-3">Payment Method</span>
                                            <select
                                                name={'method'}
                                                value={method}
                                                onChange={val=>setMethod(val.target.value)}
                                                className={`inp ${errors.type ? 'border-red-600' : 'border-zinc-200'}`}
                                            >
                                                <option value="">Select</option>
                                                <option>Cash (USD)</option>
                                                <option>Ecocash (USD)</option>
                                                <option>Bank Transfer (USD)</option>
                                            </select>

                                            {
                                                errors.type && (
                                                    <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.type[0]
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
                                            mutation.isLoading ? '...Saving entry' : 'Save entry'
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
