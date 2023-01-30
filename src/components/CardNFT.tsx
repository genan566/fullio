import React from 'react'
import { IoArrowForwardCircle, IoChevronForward } from 'react-icons/io5'

import ISOTOP from "../imgs/istockphoto.jpg";
const CardNFT = ({ image }: { image: string }) => {
    return (
        <div className='w-[300px] bg-slate-900 shadow-md rounded-md overflow-hidden'>
            <img
                className="h-[250px] w-full rounded-sm object-cover bg-cover shadow-lg"
                src={image}
                alt="user Profile" />
            <div className="p-5">
                <p className=" font-MontSemiBold text-md">Secret Artistics</p>
                <p className="text-fuchsia-500 font-MontRegular text-sm">Amazing viewing</p>

                <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                    <img
                        className="h-10 w-10 rounded-full object-cover shadow-lg"
                        src={ISOTOP}
                        alt="user Profile" />
                    <p className="text-sm text-white font-MontBold">Jean15</p>
                </div>

                <p className="text-sm mb-1 mt-2 text-white font-MontSemiBold">ETH 25.00</p>
                <div className="flex row justify-between">
                    <p className="text-green-300 font-MontSemiBold text-xs">Current Bid</p>
                    <button>
                        <IoArrowForwardCircle
                            color="white"
                            size={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardNFT