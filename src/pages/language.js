import Link from 'next/link'

export default function Language() {
    return (
        <div className='pt-28 bg-[#F4EADB]'>
            <img src="\hackwrapr_logo 1.png" className="w-32 absolute left-0 top-2"/>
            <div className='font-bold text-5xl text-[#10254E] text-center'>most popular language</div>
            <div className='font-bold text-xl text-[#10254E] text-center'>take a guess!</div>

      <div className='flex flex-col items-center justify-center '>
            <div className='grid grid-cols-2 gap-20 content-center w-screen pt-32 pb-28 px-48'>
                <div className='font-bold bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl hover:shadow-lg hover:shadow-black/30'>python</div>
                <div className='font-bold bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl hover:shadow-lg hover:shadow-black/30'>java</div>
                <div className='font-bold bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl hover:shadow-lg hover:shadow-black/30'>javascript</div>
                <div className='font-bold bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl hover:shadow-lg hover:shadow-black/30'>c++</div>
            </div>
        </div>
        
        </div>
    )
}
