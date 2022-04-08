import useItems from "../hooks/useItems";

export default function ItemListComponent({title}){

    const {data,isLoading,isError}=useItems()


    if(isLoading){
        return (
            <div>
                <span className="block text-xs text-center">...Loading</span>
            </div>
        )
    }

    if(isError){
        return (
            <div>
                <span className="block text-xs text-center">Something went wrong</span>
            </div>
        )
    }


    return data && (
        <div>
            {
                data.length >0 ? (
                    <div>
                        {

                                <table className='w-full'>
                                    <thead>
                                        <tr>
                                            <td width={'5%'}></td>
                                            <th width={'70%'} className='text-xs text-left font-medium p-5'>Name</th>
                                            <th width={'25%'} className='text-xs text-left font-medium p-5'>Calculation Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.filter(m=>m.type===title).map((d,i)=>(
                                            <tr key={i}>
                                                <td>
                                                    <div className="w-3 h-3 rounded border border-gray-400"></div>
                                                </td>
                                                <td className='text-xs text-light p-4'>{d.title}</td>
                                                <td className='text-xs text-light p-4'>fixed</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>

                        }
                    </div>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}
