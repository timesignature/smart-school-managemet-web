import MainLayout from "../../Layout/MainLayout";

export default function Home(){



    return (
        <MainLayout>
            <div className="p-20">
                <span className="block text-4xl font-light">Dashboard</span>

                <div className='mt-10'>

                    <span className="block text-3xl font-light text-p-100">
                        Income & Expenses
                    </span>

                </div>
                <div className="grid grid-cols-2 gap-10 mt-10">
                    <div className='p-10 border border-zinc-200'>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <span className="block text-base font-medium uppercase">
                                    Expenses Summary
                                </span>
                                <div className="flex items-center space-x-3 mt-3">
                                    <span className="block text-2xl font-medium">$0.00</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-red-50 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                            </div>
                        </div>

                        <span className="block text-sm font-light mt-10">
                            Monthly Expenses summary by category
                        </span>
                    </div>

                    <div className='p-10 border border-zinc-200'>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <span className="block text-base font-medium uppercase">
                                    Income Summary
                                </span>
                                <div className="flex items-center space-x-3 mt-3">
                                    <span className="block text-2xl font-medium">$0.00</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-red-50 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>

                        <span className="block text-sm font-light mt-10">
                            Monthly Income summary by category
                        </span>
                    </div>

                    <div className='p-10 border border-zinc-200'>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <span className="block text-base font-medium uppercase">
                                    Income Vs Expenses
                                </span>
                                <div className="flex items-center space-x-3 mt-3">
                                    <span className="block text-2xl font-medium">$0.00</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-red-50 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                        </div>

                        <span className="block text-sm font-light mt-10">
                            Monthly Incomes vsExpenses summary by category
                        </span>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}
