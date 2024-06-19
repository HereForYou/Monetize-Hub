import React from "react";
import AnaylsisCard from "../component/section/AnalysisCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from '@fortawesome/free-solid-svg-icons';

interface IHomeProps {
  user: any;
  point: number;
  totalPoint: number;
  handleMining: () => void;
  handleStopMining: () => void;
  start: boolean;
  hour: number;
  min: number;
  sec: number;
  claimShow: boolean;
  handleClaim: () => void;
}
const Exchange: React.FC<IHomeProps> = ({ user, point, totalPoint, handleMining, handleStopMining, claimShow, handleClaim, start, hour, min, sec }) => {

  return (
    <div className="h-full flex flex-col text-center items-center justify-between py-2">
      <AnaylsisCard />
      <div className="flex flex-col items-center justify-center gap-3">
        <img className="logo h-[120px] w-[120px] rounded-full" src="/image/bleggs-miniapp.png" alt="logo" />
        <h3 className="tgId text-[32px]  opacity-80">{user?.first_name} {user?.last_name}</h3>
      </div>
      <div className="flex flex-col balance gap-6 pt-2">
        <div className="flex flex-row items-center justify-center gap-3">
          <FontAwesomeIcon className='cursor-pointer  hover:text-graydark hover:opacity-70 transition-all duration-700' icon={faWallet} />
          <h4 className="text-[20px]">balances</h4>
        </div>
        <h1 className="font-bold text-[52px] ">{totalPoint.toFixed(3)}</h1>
        <h3 className="font-bold text-[20px]">POINTS</h3>
      </div>
      {
        !start ? (
          claimShow ? (
            <button onClick={handleClaim} className="customBtn py-2 px-4">Claim</button>
          ) : (
            <button onClick={handleMining} className="customBtn startBt py-2 px-4">Start Mining</button>
          )
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="customCard flex flex-row w-full  justify-between items-center">
              <img src="/image/axs.png" alt="pick-icon" className="h-[30px] w-[30px]" />
              <h4 className="text-[24px]">{point.toFixed(3)}</h4>
            </div>
            <div className="customCard flex flex-row w-full  justify-between items-center">
              <h2 className="earning text-[28px]">Earning</h2>
              <section className="flex flex-row gap-4">
                <>
                  <div className="flex flex-col text-center">
                    <h3 className="text-[24px]">{hour}</h3>
                    <h4 className="text-[12px]">Hours</h4>
                  </div>
                  <div className="flex flex-col text-center">
                    <h3 className="text-[24px]">{min}</h3>
                    <h4 className="text-[12px]">Mins</h4>
                  </div>
                  <div className="flex flex-col text-center">
                    <h3 className="text-[24px]">{sec}</h3>
                    <h4 className="text-[12px]">Secs</h4>
                  </div>
                </>
              </section>
            </div >
            <button onClick={handleStopMining} className="customBtn py-4 px-4">Stop Mining</button>
          </div>
        )
      }
    </div >
  )
}

export default Exchange;