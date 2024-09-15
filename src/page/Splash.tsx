import React from 'react'
import Confetti from "react-confetti";
// import { convertToShorthand } from '../utils/functions'

interface ISplashProps {
  ranking: any
  totalPoint: number
  referral: number
  setTab: (tab: string) => void
}

const Splash: React.FC<ISplashProps> = ({
  ranking,
  // totalPoint,
  // referral,
  setTab
}) => {


  const handleResize = () => {
    console.log("window size", window.innerHeight)
  }
  window.addEventListener('resize', handleResize);
  
  return (
    window.innerHeight > 768 ? <div className='flex flex-col justify-between h-full w-full pt-4 bg-cover bg-center'>
      <div className='flex flex-col relative items-center justify-center'>
        <img src='homeImg.png' className='absolute w-48 top-36' />
        <img src='homeImg2.png' className='absolute top-10 w-full' />
      </div>
      <div className='flex flex-col px-[20px] justify-between pt-0.5 gap-16 text-center'>
        <div className='flex flex-col gap-10'>
          <div className='leading-none flex flex-col gap-1 text-center'>
            <p className='text-[50px] font-bold'>Buff Buff!</p>
            <p className='text-[32px] font-bold text-nowrap text-center'>
              Claim your {ranking} $Buffy
            </p>
          </div>
          <p className='text-[18px] text-center'>
            You're our {ranking}th member! Bring your friends onboard and unlock
            even more rewards from their success!
          </p>
        </div>
        <button
          className='bg-[#4b37dd] w-full h-[2.5rem] leading-none'
          onClick={() => setTab('Exchange')}
        >
          Claim Buffy
        </button>
      </div>
      <Confetti/>
    </div> : 
    <div className='flex flex-col justify-between h-full w-full pt-4 bg-cover bg-center'>
    <div className='flex flex-col relative items-center w-full justify-center'>
      <img src='homeImg.png' className='absolute w-32 top-28' />
      <img src='homeImg2.png' className='absolute top-10 w-full' />
    </div>
    <div className='flex flex-col px-[20px] justify-between pt-0.5 gap-5 text-center'>
      <div className='flex flex-col gap-3'>
        <div className='leading-none flex flex-col gap-1 text-center'>
          <p className='text-[50px] font-bold'>Buff Buff!</p>
          <p className='text-[32px] font-bold text-nowrap text-center'>
            Claim your {ranking} $Buffy
          </p>
        </div>
        <p className='text-[18px] text-center'>
          You're our {ranking}th member! Bring your friends onboard and unlock
          even more rewards from their success!
        </p>
      </div>
      <button
        className='bg-[#4b37dd] w-full h-[2.5rem] leading-none'
        onClick={() => setTab('Exchange')}
      >
        Claim Buffy
      </button>
    </div>
    <Confetti/>
  </div>
  )
}
export default Splash
