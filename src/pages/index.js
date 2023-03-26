import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='pt-20 justify-center bg-[#F4EADB] h-screen overflow-hidden'>

      <div className='font-bold text-7xl text-[#10254E] text-center '>HackWrapr</div>
      <div className='font-bold text-xl text-[#10254E] text-center'>hackathons, enumerated.</div>
      
      <div className='flex justify-center w-screen pt-20 pb-4'>
        <input className='bg-[rgba(16,37,78,0.25)]  h-14 p-4 w-[900px] rounded-2xl placeholder-[rgba(16,37,78,0.5)]' placeholder='ex. tamuhack-2023.devpost.com'></input>
      </div>
      {/* <div className='font-bold text-l text-[#10254E] ml-48'>ex) tamuhack-2023.devpost.com</div> */}

      <div className='flex justify-center items-center w-screen pt-16'>
        <Link href= "/" className='bg-[rgba(16,37,78,0.25)] p-4 w-[200px] px-4 text-center text-[#10254E] rounded-2xl text-2xl font-bold'>enter</Link>
      </div>

      <div className="flex flex-wrap justify-center py-4 w-screen ">
        <img
      src="\waves.png"
      className="w-screen rounded-lg duration-300 ease-in-out overflow-clip"
      alt="" />
        </div>
        
    </div>
  )
}
