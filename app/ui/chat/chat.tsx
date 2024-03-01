
export default async function Chat() {

    return (
        < div className='grid grid-flow-col h-screen' >
            <div className='bg-purple-500 flex flex-col'>
                <button className=" hover:bg-purple-700 p-4 flex flex-col font-bold  gap-4">
                    <div className="text-white ">player 1 (Me)</div>
                    <div className="flex gap-2 items-center">
                        <div className="rounded h-2 w-2 bg-green-500"></div>
                        <div>online</div>
                    </div>
                </button>
                <button className=" hover:bg-purple-700 p-4 flex flex-col font-bold  gap-4">
                    <div className="text-white ">player 1 (Me)</div>
                    <div className="flex gap-2 items-center">
                        <div className="rounded h-2 w-2 bg-green-500"></div>
                        <div>online</div>
                    </div>
                </button>
            </div>
            <div className='bg-white'>right</div>
        </div >
    )
}