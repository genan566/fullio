import React from 'react'

import '../styles/NFTItem.scss';

import CustomIMG from "../imgs/pexels-jonathan-borba.jpg"
import CustomIMG2 from "../imgs/pexels-pixabay.jpg"

const NFTItem = ({ image, creator }: { image?: string, creator?: string }) => {
    return (
        <div
            className="
        h-96 
     NFTS
        bg-white 
        bg-cover"
            style={{ backgroundImage: `url(${image || CustomIMG})`, width: "calc(33% - 10px)" }}>
            <div className="NFTS-details">
                <p className="text-slate-300 text-md font-MontBold">Rebirth</p>
                <div className="currentDataBox mt-2">
                    <div className="currentDataBox-text">
                        <p className="text-slate-300 font-MontSemiBold text-sm">Current Bid</p>
                        <p className="text-fuchsia-500 font-Light text-sm">Current Bid</p>
                    </div>
                    <div className="currentDataBox-text">
                        <p className="text-slate-300 font-MontSemiBold text-sm">Ending In</p>
                        <p className="text-slate-100 font-semibold text-sm">07h:34m:38s</p>
                    </div>
                </div>
                <figure className="nftsUserImg bg-cover drop-shadow-md bg-center" style={{ backgroundImage: `url(${creator || CustomIMG2})` }}></figure>
            </div>
        </div>
    )
}

export default NFTItem;