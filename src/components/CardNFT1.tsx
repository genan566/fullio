import React from 'react'

import NFT10 from "../imgs/10.png";
const CardNFT1 = () => {
    return (

        <div className="rounded-xl p-4 py-3 w-[300px] shadow-lg bg-zinc-800 opacity-[.9]">
            <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                <img
                    className="h-12 w-12 rounded-full object-cover shadow-lg"
                    src={NFT10}
                    alt="user Profile" />
                <div className="">
                    <p className="text-[.9rem] text-white font-MontBold">Jean Gontran</p>
                    <p className="text-[.75rem] text-zinc-600 font-MontBold">admin</p>
                </div>
            </div>
            <img
                className="h-[200px] w-[100%] rounded-xl mt-[1rem] object-cover shadow-lg"
                src={NFT10}
                alt="user Profile" />

            <div className="flex justify-between gap-1 items-center mt-[1rem]">
                <p className="text-[.9rem] text-white font-MontBold">Explosion Closure</p>
                <p className="text-[.75rem] text-zinc-500 font-MontBold">2.1</p>
            </div>

            <div className="flex justify-between gap-1 items-center mt-[.8rem]">
                <p className="text-[.9rem]  text-zinc-500 font-MontBold">Price ETH</p>
                <p className="text-[.75rem] text-white font-MontBold">2.55</p>
            </div>
        </div>
    )
}

export default CardNFT1