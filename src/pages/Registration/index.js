import MainLayout from "../../Layout/MainLayout";

export default function Registration(){
    return (
        <MainLayout>
            <div className="p-20">
                <div>
                    <span className="block text-4xl font-light">Student Term Registration</span>
                    <span className="block text-xs mt-3 font-light">please make sure to select the right student</span>
                </div>

                <grid className="mt-20 grid grid-cols-3 gap-10">
                    <div className='row-span-2'>
                        <label>
                            <span className="block text-xs mb-3">Billed To</span>
                            <input type="text" className="input"/>
                        </label>
                    </div>


                    <div className='row-span-2 space-y-10'>
                        <div>
                            <label>
                                <span className="block text-xs mb-3">Select Fees</span>
                                <input type="text" className="input"/>
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs mb-3">Reference No.</span>
                                <input type="text" value={Date.now()} className="input"/>
                            </label>
                        </div>
                    </div>


                    <div className='row-span-2 space-y-10'>
                        <div>
                            <label>
                                <span className="block text-xs mb-3">Date Issued</span>
                                <input type="date" value={Date.now()} className="input"/>
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs mb-3">Date Due</span>
                                <input type="date" className="input"/>
                            </label>
                        </div>
                    </div>



                </grid>

                <div className="mt-10">
                    <button className="btn bg-p-100 text-white">
                        Save new entry
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
