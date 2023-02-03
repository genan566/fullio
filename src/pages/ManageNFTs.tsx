import React from 'react'
import { IoArrowForward, IoFilter } from 'react-icons/io5'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import CardNFT1 from '../components/CardNFT1'
import NFT11 from "../imgs/istockphoto.jpg";

import { motion } from "framer-motion"
import CardNFT from '../components/CardNFT'

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
const ManageNFTs = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='relative'>

            <div className=''>


                <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                    <div className="container-img-content">
                        <p className="text-[2.7rem] text-slate-50 font-MontBold leading-[3.5rem] text-center w-full">Personnal Products
                            <span className="block animated_gradient_bg textS">NFTs marketplace</span></p>
                    </div>
                </div>

                <div className="mb-3 mt-[5rem]">
                    <h2 className="text-[1.8rem] font-MontBold text-white">Yours Products</h2>
                    <Link to={"/createNFt"}>
                        <button
                            // onClick={handleLog}
                            className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                            hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500 mt-5
                                py-1 text-white px-3
                                rounded-lg">
                            <RiShoppingBasket2Line
                                // color="white"
                                size={17}
                            /> <p>Create One</p>
                        </button></Link>
                    <div className="flex mt-[1.5rem] gap-4 row align-center ">
                        <div className="flex mt-2 gap-4 row">
                            <button className="p-[1rem] rounded-md 
                        shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>
                            <button className="p-[1rem] rounded-md 
                                shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>
                            <button className="p-[1rem] rounded-md 
                                        shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>

                            <button className="p-[1rem] rounded-md 
                        shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>
                        </div>
                        <button className="p-[1rem] rounded-md 
                                shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem]
                                 hover:bg-indigo-500 flex justify-evenly gap-2 items-center text-sm">
                            <IoFilter
                                color="white"
                                size={15}
                            /> On sale</button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-[2rem] mt-[3rem]">
                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT11} />
                </div>

                <div className="mb-3 mt-[5rem]">
                    <h2 className="text-[1.8rem] font-MontBold text-white">Top Collections</h2>
                    <div className="flex mt-[1.5rem] gap-4 row align-center ">
                        <div className="flex mt-2 gap-4 row">
                            <button className="p-[1rem] rounded-md 
                        shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>
                            <button className="p-[1rem] rounded-md 
                                shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>
                            <button className="p-[1rem] rounded-md 
                                        shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>

                            <button className="p-[1rem] rounded-md 
                        shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm">On sale</button>
                        </div>
                        <Link to={"/nftMarketPlace"}>
                            <button
                                // onClick={handleLog}
                                className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                            hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500
                                py-1 text-white px-3
                                rounded-lg"> <p>View all</p>
                                <IoArrowForward
                                    // color="white"
                                    size={17}
                                />
                            </button></Link>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-[2rem] mt-[3rem]">

                    {/* <CardNFT1 />
                    <CardNFT1 />
                    <CardNFT1 /> */}

                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT11} />

                </div>
            </div>

        </motion.div>
    )
}

export default ManageNFTs