import MainLayout from "../../Layout/MainLayout";
import TransactionComponent from "../../components/TransactionComponent";
import useTransactions from "../../hooks/useTransactions";
import moment from "moment";

export default function Transactions(){



    const {data,isLoading,isError}=useTransactions()

    const Rendered=()=>{
        if(isLoading){
            return (
                <div>
                    <span className="block text-xs text-center">Loading ...</span>
                </div>
            )
        }


        if(isError){
            return (
                <div>
                    <span className="block text-xs text-center">Something went wrong, please check your internet connection</span>
                </div>
            )
        }


        return data && data.length > 0 ? (
            <table className="w-full">
                <thead>
                <tr>
                    <th width={'30%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Date</th>
                    <th width={'40%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Description</th>
                    <th width={'20%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Amount</th>
                    <th width={'10%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(s=>(
                        <tr key={s.id}>
                            <td className='text-xs py-4 border-b border-zinc-100'>
                                {moment(s.created_at).format('DD MMMM YYYY')}
                            </td>
                            <td className='text-xs py-4 border-b border-zinc-100'>{s.description}</td>
                            <td className='text-xs py-4 border-b border-zinc-100'>{s.amount}</td>
                            <td className='text-xs py-4 border-b border-zinc-100'>
                                {s.isExpense ? 'Expenses' : 'Incomes'}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        ) : (
            <div>
                <span className="block text-xs text-center">
                    No Content
                </span>
            </div>
        )
    }



    return (
        <MainLayout>
            <div className="p-20">
                <div className="flex items-center justify-between">
                    <span className="block text-4xl font-light">
                        Transactions
                    </span>

                    <div className="flex items-center space-x-5">
                        <TransactionComponent title={'Add Expenses'} isExpense={true}/>
                        <TransactionComponent title={'Add Incomes'} isExpense={false}/>
                    </div>

                </div>


                <div className="mt-20">
                    <Rendered/>
                </div>
            </div>
        </MainLayout>
    )
}
