import React from 'react'
import { IoArrowDown, IoArrowForward, IoDiceSharp, IoFlameSharp, IoFlash } from 'react-icons/io5';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import CardNFT from '../components/CardNFT'

import NFT8 from "../imgs/5.png";
import NFT9 from "../imgs/6.png";
import NFT10 from "../imgs/10.png";
import NFT11 from "../imgs/istockphoto.jpg";
import NFT12 from "../imgs/istockphoto-1367699775-612x612.jpg";


import ISOTOP from "../imgs/vadim-bogulov-lG4A4GmcYYg-unsplash.jpg";
import ISOTOP2 from "../imgs/5348934.jpg";
import Partner1 from "../imgs/partner/partner-1.png";
import Partner2 from "../imgs/partner/partner-2.png";
import Partner3 from "../imgs/partner/partner-3.png";
import Partner4 from "../imgs/partner/partner-4.png";
import Partner5 from "../imgs/partner/partner-5.png";
import Partner6 from "../imgs/partner/partner-6.png";


import { motion } from "framer-motion"

import "../styles/HomeView.scss"
import { RootCreatorContext, RootUserContext } from '../contexts';
import { useNavigate } from 'react-router-dom';



const containerVariants = {


    hidden: {
        opacity: 0,
        x: "-2.5vh",
    },
    visible: {
        opacity: 1,
        x: "0",
        transition: { duration: .7, ease: "easeIn" }
    },

    inversevisible: {
        opacity: 1,
        y: "0",
        transition: { duration: .7 }
    },
    inverseexit: {
        opacity: 0,
        y: "-2.5vh",
        transition: { duration: .7 }
    },
    exit: {
        x: "-2.5vh",
        opacity: 0,
        transition: { ease: 'easeInOut' },
    }
};

const HomeView = () => {
    const userContext = React.useContext(RootUserContext)
    const creatorContext = React.useContext(RootCreatorContext)

    const history = useNavigate()

    return (
        <div className="homeView">
            <div className="w-full max-[500px]:pr-[1.5rem]">
                <div className="animated_gradient_bg h-fit rounded-lg shadow-xl
                     max-[800px]:p-[1.9rem] p-[4rem] py-[3rem] flex justify-between mb-[10rem]">
                    <div className="flex gap-[1rem] justify-between w-full">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex flex-col gap-1 justify-center">
                            <p className="text-dynamique font-MontBold mt-1 max-w-[500px] max-[500px]:w-full">Create/Manage <span>NFTs</span> for your digital products/clients.</p>
                            <p className='mt-2 text-sm inline-block max-w-[500px] max-[500px]:w-full'>Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nobis error neque dicta quam numquam fuga
                                libero fugiat! Itaque, esse neque. Fugit animi quis ut. Eligendi id temporibus voluptas vel ratione!</p>

                            <div className="flex gap-4 mt-[2rem]">
                                <button
                                    onClick={() => {
                                        !userContext?.user?.is_staff && creatorContext?.setisCreator(true)
                                        userContext?.user?.is_staff && history("/createNFt")

                                        // creatorContext?.setisCreator(true)
                                    }}
                                    // onClick={handleLog}
                                    className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-3
                                            rounded-lg">
                                    <RiShoppingBasket2Line
                                        // color="white"
                                        size={17}
                                    /> <p>Start Now</p>
                                </button>

                                <button
                                    onClick={() => history("/nftMarketPlace")}
                                    // onClick={handleLog}
                                    className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                        hover:bg-white hover:text-black
                                        
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-3
                                            rounded-lg">
                                    <IoArrowDown
                                        // color="white"
                                        size={17}
                                    /> <p>Discover More</p>
                                </button>
                            </div>
                        </motion.div>
                        <div className="max-[950px]:hidden">
                            <motion.img
                                initial="inverseexit"
                                animate="inversevisible"
                                variants={containerVariants}
                                className="min-h-[470px] max-h-[450px] min-w-[450px] max-w-[450px] object-center shadow-2xl rounded-lg bg-cover"
                                src={ISOTOP}></motion.img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="homeView-products px-[1.5rem] min-[1400px]:px-[4.2rem]">

                <div className="flex flex-row justify-center gap-[1rem] items-center max-[500px]:flex-wrap">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                    after:absolute after:top-0 after:left-0 after:bg-white relative text-[2rem] leading-[2.5rem] py-4 w-1/2 max-[500px]:w-full">
                        Discover a unique <span className="block">collection artistic works</span>
                    </h2>

                    <p className='text-white text-sm w-1/2 max-[500px]:w-full'>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Nobis error neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                        libero fugiat! Itaque, esse neque. Fugit animi quis ut. Eligendi id temporibus voluptas vel ratione!</p>
                </div>

                <div className="mt-[5rem] flex max-[1400px]:flex-wrap gap-[2rem] gap-y-[3rem] min-[1000px]:justify-center">
                    <div className="min-w-[300px] max-w-[400px] bg-white p-[1.5rem] rounded-md relative">
                        <div className="p-[.8rem] rounded-full animated_gradient_bg text w-fit overflow-hidden absolute top-[-2rem] left-[1rem] shadow-lg">
                            {/* <img
                                className="w-[4rem] h-[4rem] object-cover shadow-lg bg-cover"
                                src={ISOTOP} /> */}

                            <IoDiceSharp
                                // color="white"
                                size={40}
                            />
                        </div>
                        <div className="mt-[2rem]">
                            <p className="text-lg font-MontSemiBold text-black mb-[1rem]">Lorem ipsum dolor sit amet <span className="text-indigo-500">consectetur</span></p>
                            <p className='mt-2 text-black text-sm'>Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nobis error neque dicta <span className="text-black font-MontSemiBold">quam numquam fuga </span>
                                libero fugiat! Itaque, esse neque. Fugit animi quis ut. Eligendi id temporibus voluptas vel ratione!</p>
                        </div>
                    </div>

                    <div className="min-w-[300px] max-w-[400px] bg-white p-[1.5rem] rounded-md relative">
                        <div className="p-[.8rem] rounded-full animated_gradient_bg text w-fit overflow-hidden absolute top-[-2rem] left-[1rem] shadow-lg">
                            {/* <img
                                className="w-[4rem] h-[4rem] object-cover shadow-lg bg-cover"
                                src={ISOTOP} /> */}

                            <IoFlameSharp
                                // color="white"
                                size={40}
                            />
                        </div>
                        <div className="mt-[2rem]">
                            <p className="text-lg font-MontSemiBold text-black mb-[1rem]">Lorem ipsum dolor sit amet <span className="text-indigo-500">consectetur</span></p>
                            <p className='mt-2 text-black text-sm'>Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nobis error neque dicta <span className="text-black font-MontSemiBold">quam numquam fuga </span>
                                libero fugiat! Itaque, esse neque. Fugit animi quis ut. Eligendi id temporibus voluptas vel ratione!</p>
                        </div>



                        <button
                            // onClick={handleLog}
                            className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-indigo-500
                                        hover:bg-white hover:text-black mt-[1.5rem]
                                        
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-indigo-500 px-3
                                            rounded-lg">
                            <IoArrowDown
                                // color="white"
                                size={17}
                            /> <p>Discover More</p>
                        </button>
                    </div>

                    <div className="min-w-[300px] max-w-[400px] bg-white p-[1.5rem] rounded-md relative">
                        <div className="p-[.8rem] rounded-full animated_gradient_bg text w-fit overflow-hidden absolute top-[-2rem] left-[1rem] shadow-lg">
                            {/* <img
                                className="w-[4rem] h-[4rem] object-cover shadow-lg bg-cover"
                                src={ISOTOP} /> */}

                            <IoFlash
                                // color="white"
                                size={40}
                            />
                        </div>
                        <div className="mt-[2rem]">
                            <p className="text-lg font-MontSemiBold text-black mb-[1rem]">Lorem ipsum dolor sit amet <span className="text-indigo-500">consectetur</span></p>
                            <p className='mt-2 text-black text-sm'>Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nobis error neque dicta <span className="text-black font-MontSemiBold">quam numquam fuga </span>
                                libero fugiat! Itaque, esse neque. Fugit animi quis ut. Eligendi id temporibus voluptas vel ratione!</p>
                        </div>
                    </div>

                </div>

                <p className="text-xl font-MontSemiBold text-center mt-[10rem]">Collections Products
                    <span className="rounded-lg border border-white text-[.8rem] py-1 px-4 ml-3 shadow-md">20</span></p>
                <p className="text-sm mt-[15px] font-MontSemiBold text-center text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>


                <div className="mt-[50px] flex gap-[25px] items-center w-full flex-wrap justify-center">
                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT10} />
                    <CardNFT image={NFT8} />
                    <CardNFT image={NFT9} />
                    <CardNFT image={NFT12} />
                </div>

                <div className="mt-[5rem]">

                    <button
                        // onClick={handleLog}

                        onClick={() => history("/nftMarketPlace")}
                        className="bg-transparent mx-auto flex row items-center justify-center gap-1 w-fit border border-white
                                        hover:bg-white hover:text-black
                                        
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-3
                                            rounded-lg">
                        <IoArrowDown
                            // color="white"
                            size={17}
                        /> <p>Check More</p>
                    </button>
                </div>

                <div className="px-[3vw] mt-[10rem]">
                    <div className="mt-[5rem] flex flex-wrap gap-[1rem] justify-between mb-[2rem]">
                        <div className="flex rows gap-[1rem] items-center">
                            <p className="text-xl font-MontSemiBold ">Featured Products</p>
                            <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md flex items-center gap-[.25rem]">
                                <div className='point'></div> The Best Choice</span>
                        </div>

                        <button
                            // onClick={handleLog}
                            className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                        hover:bg-white hover:text-black
                                        
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-3
                                            rounded-lg">
                            <IoArrowForward
                                // color="white"
                                size={17}
                            /> <p>Latest added</p>
                        </button>

                    </div>

                    <div className="flex justify-between flex-wrap items-center animated_gradient_bg shadow-md rounded-md overflow-hidden">
                        <div className="w-[50%] h-full max-[750px]:w-[100%] max-[750px]:order-2 p-[1rem]">
                            {/* <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                <img
                                    className="h-10 w-10 rounded-full object-cover shadow-lg"
                                    src={ISOTOP}
                                    alt="user Profile" />
                                <p className="text-sm text-white font-MontBold">Jean15</p>
                            </div> */}
                            <div className="text-center">
                                <div className="flex gap-[1rem] items-center text-center w-full">
                                    <div className="rounded-lg bg-indigo-600 text-white text-[.8rem] 
                                    py-1 px-4 shadow-md flex mx-auto items-center gap-[.25rem]">
                                        <div className='point'></div>Best Popular</div>
                                </div>

                                <h2 className="text-[2rem] font-MontSemiBold text-white mt-[1rem]">Missing Puzzle</h2>

                                <p className="text-center text-white text-sm mt-[1rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Exercitationem repellendus saepe quaerat alias voluptate quis vel ducimus nostrum eos magnam nulla, beatae molestiae
                                    obcaecati provident. Deserunt, sequi. Nulla, odio ea.</p>
                            </div>

                            <h2 className="text-[1rem] font-MontRegular text-white mt-[2rem] mb-[-.24rem] text-center">Missing Puzzle</h2>
                            <div className="text-center">
                                <div className="text-[2rem] mb-1 text-white font-MontSemiBold">25.00 ETH</div>
                            </div>

                            <div className="mt-[1rem] flex items-center gap-[2rem] justify-center flex-wrap">

                                <button
                                    // onClick={handleLog}
                                    className="bg-indigo-500 flex row items-center justify-center gap-1 w-fit
                                        hover:bg-white hover:text-black
                                        
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-3
                                            rounded-lg">
                                    <IoArrowDown
                                        // color="white"
                                        size={17}
                                    /> <p>Check More</p>
                                </button>

                                <button
                                    // onClick={handleLog}
                                    className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-indigo-500
                                        hover:bg-white hover:text-black
                                        
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-indigo-500 px-3
                                            rounded-lg">
                                    <IoArrowDown
                                        // color="white"
                                        size={17}
                                    /> <p>Contact to Buy</p>
                                </button>
                            </div>
                        </div>
                        <figure className='w-[50%] max-[750px]:w-[100%] max-[750px]:order-0 relative h-[500px] max-[750px]:h-[350px]'>
                            <img
                                className="absolute top-0 left-0 right-0 w-[100%] h-[100%] bottom-0 object-fill shadow-lg bg-cover"
                                src={ISOTOP2} />
                        </figure>
                    </div>
                </div>

                <p className="text-xl font-MontSemiBold text-center mt-[7rem]">Ours Partners</p>
                <p className="text-sm mt-[15px] font-MontSemiBold 
                        text-center text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <div className="mt-[50px] flex gap-[5rem] items-center w-full flex-wrap justify-center">
                    <img
                        className="w-[90px] h-[90px] object-cover shadow-lg rounded-lg bg-cover"
                        src={Partner1} />
                    <img
                        className="w-[90px] h-[90px] object-cover shadow-lg rounded-lg bg-cover"
                        src={Partner2} />

                    <img
                        className="w-[90px] h-[90px] object-cover shadow-lg rounded-lg bg-cover"
                        src={Partner3} />

                    <img
                        className="w-[90px] h-[90px] object-cover shadow-lg rounded-lg bg-cover"
                        src={Partner4} />

                    <img
                        className="w-[90px] h-[90px] object-cover shadow-lg rounded-lg bg-cover"
                        src={Partner5} />

                    <img
                        className="w-[90px] h-[90px] object-cover shadow-lg rounded-lg bg-cover"
                        src={Partner6} />
                </div>
            </div>
        </div >
    )
}

export default HomeView