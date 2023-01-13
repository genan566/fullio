import React from 'react'

import { IoFilter, IoSearch, IoPerson, IoPawSharp } from "react-icons/io5";
import NFT from "../imgs/nftsImgs/unnamed5.jpg";
import NFT2 from "../imgs/nftsImgs/unnamed.jpg";
import NFT3 from "../imgs/nftsImgs/unnamed3.jpg";
import NFT4 from "../imgs/nftsImgs/unnamed4.jpg";
import NFT5 from "../imgs/1.png";
import NFT6 from "../imgs/2.png";
import NFT7 from "../imgs/4.png";
import NFT8 from "../imgs/5.png";
import NFT9 from "../imgs/6.png";
import NFT10 from "../imgs/10.png";

import User1 from "../imgs/users/image1.png";
import User2 from "../imgs/users/image2.png";
import User3 from "../imgs/users/image3.png";
import User4 from "../imgs/users/image4.png";
import User5 from "../imgs/users/image5.png";
import User6 from "../imgs/users/image6.png";
import User7 from "../imgs/users/image7.png";
import User8 from "../imgs/users/image8.png";
import User9 from "../imgs/users/image9.png";
import User10 from "../imgs/users/image10.png";

import { RiNotificationBadgeFill } from "react-icons/ri";


import { motion } from "framer-motion"
import NFTItem from '../components/NFTItem';


const containerVariants = {

    
    hidden: {
        opacity: 0,
        x: "-2.5vh",
    },
    visible: {
        opacity: 1,
        x: "0",
        // transition: { duration: .5 }
    },
    exit: {
        x: "-2.5vh",
        opacity: 0,
        transition: { ease: 'easeInOut' },
    }
};


const ContainerPrincipal = () => {

    return (
        // <div style={{ position: "relative" }}>


        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                {/* <img src={ImContainer} className="object-cover" alt="Imgs" /> */}
                <div className="container-img-content">
                    <p className="text-4xl text-slate-50 font-MontBold">Create Your <span className="block mt-2">NFTs marketplace</span></p>
                    <div className="flex gap-4 mt-2">
                        <button className="bg-violet-500
                            hover:bg-violet-600
                            active:bg-violet-700 
                            focus:outline-none  shadow-md
                            focus:ring-2 text-md
                            focus:ring-violet-300
                                py-2 text-white px-5
                                rounded-2xl mt-5">
                            Save changes
                        </button>

                        <button className="bg-transparent
                                hover:bg-white border border-slate-300 hover:border-slate-400
                                active:bg-white-700 text-md
                                focus:outline-none shadow-md
                                focus:ring-1 hover:text-black
                                focus:ring-violet-300
                                    py-2 text-white px-5
                                    rounded-2xl mt-5">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="mb-3">
                    <h2 className="text-xl font-MontSemiBold text-white">Trending Auctions</h2>
                    <div className="flex mt-2 gap-4 row align-center">
                        <div className="flex mt-2 gap-4 row">
                            <button className="customButtonFilterD">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                        </div>
                        <button className="customButtonFilterD">
                            <IoFilter
                                color="white"
                                size={15}
                            /> On sale</button>
                    </div>
                </div>
                <div className="flex gap-5 mt-10 align-center pb-10 flex-wrap">
                    <NFTItem image={NFT5} creator={User1} />
                    <NFTItem image={NFT6} creator={User2} />
                    <NFTItem image={NFT7} creator={User3} />
                    <NFTItem image={NFT8} creator={User4} />
                    <NFTItem image={NFT9} creator={User5} />
                    <NFTItem image={NFT} creator={User6} />
                    <NFTItem image={NFT2} creator={User7} />
                    <NFTItem image={NFT3} creator={User8} />
                    <NFTItem image={NFT4} creator={User9} />
                    <NFTItem image={NFT10} creator={User10} />
                </div>
            </div>
        </motion.div>
        // </div>
    )
}

export default ContainerPrincipal