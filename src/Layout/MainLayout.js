import Layout from "./index";
import {NavLink} from "react-router-dom";

export default function MainLayout({children}){
    return (
        <Layout>
            <div className="bg-zinc-100 text-teal-900 overflow-y-auto p-12">

                <div>
                    <div className="w-12 h-12 text-p-100 rounded bg-zinc-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className='mt-10 space-y-5'>
                    <NavLink to={'/'} className="block text-xs">Dashboard</NavLink>
                </div>

                <div className='mt-10 space-y-5'>
                    <span className="block text-sm font-semibold">School Management</span>
                    <NavLink to={'/students'} className="block text-xs">Students (Active)</NavLink>
                    <NavLink to={'/fees'} className="block text-xs">Fees Payment</NavLink>
                    <NavLink to={'/terms'} className="block text-xs">Terms</NavLink>
                </div>

                <div className='mt-10 space-y-5'>
                    <span  className="block text-sm font-semibold">Employee Management</span>
                    <NavLink to={'/employees'} className="block text-xs">Employees</NavLink>
                    <NavLink to={'/payroll'} className="block text-xs">Payroll</NavLink>
                    <NavLink to={'/salary'} className="block text-xs">Salary Properties</NavLink>
                </div>

                <div className='mt-10 space-y-5'>
                    <span className="block text-sm font-semibold">Bookkeeping</span>
                    <NavLink to={'/transactions'} className="block text-xs">Transactions</NavLink>
                    <span className="block text-xs">Reports</span>
                </div>

                <div className='mt-10 space-y-5'>
                    <span className="block text-sm font-semibold">Accounts</span>
                    <NavLink to={'/setting'} className="block text-xs">Settings</NavLink>
                    <span className="block text-xs">Logout</span>
                </div>

            </div>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </Layout>
    )
}
