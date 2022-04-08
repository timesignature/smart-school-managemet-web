export default function UploadComponent({avatar,setState,label='Photo'}){

    const selectImage=(e)=>{
        setState(prev=>({
            ...prev,avatar:e.target.files[0]
        }))
    }


    return (
        <div>

            <label>
                <span className="block text-xs mb-3">{label}</span>
                <input type="file" onChange={selectImage} hidden/>
                {
                    avatar ? (
                        <div className="flex items-center space-x-3">
                            <div className='h-40 w-60'>
                                <img src={URL.createObjectURL(avatar)} className='w-full h-full rounded-lg object-cover' alt=""/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div>
                                <div className="p-10 w-60 h-40 flex flex-col items-center justify-center rounded border border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="mt-4 block text-xs text-center">Drag and drop file here or click</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </label>
        </div>
    )
}
