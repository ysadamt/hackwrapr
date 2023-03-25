import Link from 'next/link'

export default function Language() {
    return (
        <div className='pt-28 bg-[#F4EADB]'>
            <div className='font-bold text-5xl text-[#10254E] text-center'>most popular language</div>
            <div className='font-bold text-xl text-[#10254E] text-center'>take a guess!</div>

      <div className='flex flex-col items-center justify-center'>
            <div className='grid grid-cols-2 gap-20 content-center w-screen pt-32 pb-28 px-48'>
                <Link href= "/" className='bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl'>python</Link>
                <Link href= "/" className='bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl'>java</Link>
                <Link href= "/" className='bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl'>javascript</Link>
                <Link href= "/" className='bg-[rgba(16,37,78,0.25)] h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl'>c++</Link>
            </div>
        </div>

        </div>
    )
}
