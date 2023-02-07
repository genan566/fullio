import React from 'react'

import '../styles/NFTItem.scss';

import CustomIMG from "../imgs/pexels-jonathan-borba.jpg"
import CustomIMG2 from "../imgs/pexels-pixabay.jpg"
import { Link } from 'react-router-dom';
import { RootNftContext,  } from '../contexts';
import { SaleHistory } from '../types/SaleHistoryType';
import { CategoriesTrending } from '../types/CategorieTrendingType';
import { NftTypesValues } from '../types/NFTTypes';

const NFTItem = ({ image, categories_trending, creator, rebirth, data }: {
    image?: string, sales_history?: SaleHistory[],
    categories_trending?: CategoriesTrending[], creator?: string, rebirth?: string, data?: NftTypesValues
}) => {
    const nFTContext = React.useContext(RootNftContext)

    return (
        <Link
            onClick={(e) => {
                data && nFTContext?.setNftData(data)
            }}
            className='customNFTT'
            to={"/detailNFT"}>
            <div
                className="
                    h-96 shadow-2xl
                    NFTS
                    bg-slate-900 
                    bg-cover"
                style={{ backgroundImage: `url(${image})`, width: "100%" }}>
                <div className="NFTS-details">
                    <p className="text-slate-300 text-md font-MontBold mt-4">{rebirth || "Non défini"}</p>
                    <div className="currentDataBox mt-2">
                        <div className="currentDataBox-text">
                            <p className="text-slate-300 font-MontSemiBold text-xs">Current Bid</p>
                            <p className="text-fuchsia-500 font-Light text-xs">Current Bid</p>
                        </div>
                        <div className="currentDataBox-text">
                            <p className="text-slate-300 font-MontSemiBold text-xs">Ending In</p>
                            <p className="text-slate-100 font-semibold text-xs">07h:34m:38s</p>
                        </div>
                    </div>
                    <figure className="nftsUserImg bg-cover drop-shadow-md bg-center"
                        style={{ backgroundImage: `url(${creator || CustomIMG2})` }}></figure>
                </div>
            </div>
        </Link>
    )
}

export default NFTItem;