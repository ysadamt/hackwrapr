import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='pt-28 justify-center bg-[#F4EADB]'>

      <div className='font-bold text-7xl text-[#10254E] text-center '>HackWrapr</div>
      <div className='font-bold text-xl text-[#10254E] text-center'>hackathons, enumerated.</div>
      
      <div className='flex justify-center w-screen pt-20'>
        <input className='bg-[#10254E] h-14 p-4 w-9/12 px-24 rounded-2xl opacity-25'></input>
      </div>
      <div className='font-bold text-l text-[#10254E] ml-48'>ex) tamuhack-2023.devpost.com</div>

      <div className='flex justify-center w-screen pt-16'>
        <Link href= "/" className='bg-[rgba(16,37,78,0.25)] h-14 p-4 w-[200px] px-4 text-center text-[#10254E] rounded-2xl'>enter</Link>
      </div>

      <div class="flex flex-wrap justify-center py-4">
        <img
      src="\waves.png"
      class="h-auto max-w-screen rounded-lg shadow-none duration-300 ease-in-out"
      alt="" />
        </div>
        
    </div>

  )
}
