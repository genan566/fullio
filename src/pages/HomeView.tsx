import React from 'react'
import { IoArrowDown, IoArrowForward, IoDiceSharp, IoFlameSharp, IoFlash } from 'react-icons/io5';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import CardNFT from '../components/CardNFT'

import NFT8 from "../imgs/5.png";
import NFT9 from "../imgs/6.png";
import NFT10 from "../imgs/10.png";
import NFT11 from "../imgs/istockphoto.jpg";
import NFT12 from "../imgs/istockphoto-1367699775-612x612.jpg";


import ISOTOP from "../imgs/nftsImgs/teso.jpeg";
import ISOTOP2 from "../imgs/5348934.jpg";
import Partner1 from "../imgs/partner/partner-1.png";
import Partner2 from "../imgs/partner/partner-2.png";
import Partner3 from "../imgs/partner/partner-3.png";
import Partner4 from "../imgs/partner/partner-4.png";
import Partner5 from "../imgs/partner/partner-5.png";
import Partner6 from "../imgs/partner/partner-6.png";


import { motion } from "framer-motion"

import "../styles/HomeView.scss"
import { RootCreatorContext, RootNftContext, RootUserContext, RootUserTokenContext } from '../contexts';
import { Link, useNavigate } from 'react-router-dom';
import { NftsAPI } from '../APIs/NftsAPI';

import { NftTypesValues } from '../types/NFTTypes';
import RenderingNFTs from '../components/RenderingNFTs';
import { useAppDispatch } from '../hooks/modalsHooks';
import { TOGGLE_MODAL_FOR_LOGIN, TOGGLE_MODAL_SUSCRIPTION } from '../redux/constants/ModalsConstants';
import { NftsInterface } from '../types/NFTsInterface';
import { PaginatedDataNFT } from '../types/PaginatedData';



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
    const nFTContext = React.useContext(RootNftContext)
    const creatorContext = React.useContext(RootCreatorContext)
    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)
    const [nftsBestSelled, setnftsBestSelled] = React.useState<NftsInterface>({} as NftsInterface)
    const [nftsDataByFeatured, setnftsDataByFeatured] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)

    const userTokenContext = React.useContext(RootUserTokenContext)
    const history = useNavigate()
    const dispatch = useAppDispatch();

    const handleSuscribeToSale = () => {
        let filterd = nftsDataByFeatured.results.filter(i => i.price >= 100)
        if (Boolean(filterd[0])) {
            let sendedData: NftTypesValues = {
                id: filterd[0].id,
                title: filterd[0].title,
                description: filterd[0].description,
                owner_id: filterd[0].owner,
                image: filterd[0].image,
                price: filterd[0].price,
                categories_trending: filterd[0].categories_trending,
                sales_history: filterd[0].sales_history,
            }
            nFTContext?.setNftData(sendedData)

            dispatch({ type: TOGGLE_MODAL_SUSCRIPTION, payload: true })
        }
    }

    const loadBestSelled: NftsInterface = React.useMemo(() => {
        if (Boolean(nftsDataByFeatured.results)) {
            let filterd = nftsDataByFeatured.results.filter(i => i.price >= 100)
            return filterd[0]
        }
        return {} as NftsInterface
    }, [nftsDataByFeatured])

    React.useEffect(() => {
        let resNFTs = new NftsAPI()
        resNFTs
            .get_filtered_by_trendingIDs_nfts(2)
            .then(data => {
                setnftsData(data)
            })

        resNFTs
            .get_all_by_featured_cat()
            .then(data => {
                setnftsDataByFeatured(data)
            })
    }, [])

    return (
        <div className="homeView">
            <div className="w-full">
                <div className="animated_gradient_bg h-fit max-[950px]:h-[50vh] max-[550px]:h-[70vh] rounded-lg shadow-xl
                     max-[800px]:p-[1.9rem] p-[4rem] py-[3rem] flex justify-between mb-[10rem]">
                    <div className="flex gap-[1rem] justify-between items-center w-full fixed-w">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex flex-col gap-1 justify-center">
                            <p className="text-dynamique font-MontBold mt-1 max-w-[500px] max-[500px]:w-full">Create/Manage <span>NFTs</span> for your digital products/clients.</p>
                            <p className='mt-2 text-sm inline-block max-w-[500px] max-[500px]:w-full'>Unlock the world of digital ownership. Craft unique NFT experiences for your clients and celebrate your creative visions.</p>

                            <div className="flex gap-4 mt-[2rem] flex-wrap">
                                <button
                                    onClick={() => {
                                        if (!Boolean(userContext.user.id)) {
                                            dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                                        }
                                        else {
                                            !userContext?.user?.is_staff && creatorContext?.setisCreator(true)
                                            userContext?.user?.is_staff && history("/createNFt")
                                        }

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

            <div className="homeView-products px-[.25rem] min-[1400px]:px-[4.2rem] fixed-w">

                <div className="flex flex-row justify-center gap-[1rem] items-center max-[500px]:flex-wrap">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                    after:absolute after:top-0 after:left-0 after:bg-white relative text-[2rem] leading-[2.5rem] py-4 w-1/2 max-[500px]:w-full">
                        Discover a unique <span className="block">collection artistic works</span>
                    </h2>

                    <p className='text-white text-sm w-1/2 max-[500px]:w-full'>
                        Our platform connects exceptional creators, giving a new meaning to art and artistic works. Noplomi - Purchase & Sell NFT!</p>
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
                            <p className="text-lg font-MontSemiBold text-black mb-[1rem]">Everything you need in one <span className="text-indigo-500">platform place.</span></p>
                            <p className='mt-2 text-black text-sm'>Our mission is to support creators and show new possibilities in rendering <div className="span text-black font-MontSemiBold">3D models</div> and their interesting proposals in various forms.</p>
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
                            <p className="text-lg font-MontSemiBold text-black mb-[1rem]">You will find only selected products on our platform.</p>
                            <p className='mt-2 text-black text-sm'><span className="text-black font-MontSemiBold">Our platform</span> is a collection of professional creators only. We do not want to create a marketplace, we only want to show unique works of artistic.</p>
                        </div>



                        {/* <button
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
                        </button> */}
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
                            <p className="text-lg font-MontSemiBold text-black mb-[1rem]">Establish permanent cooperation and get attractive sales offers.</p>
                            <p className='mt-2 text-black text-sm'>We focus on the development platform of the application and good contact in the sell and purchase products.</p>
                        </div>
                    </div>

                </div>

                <p className="text-xl font-MontSemiBold text-center mt-[10rem]">Collections Products
                    <span className="rounded-lg border border-white text-[.8rem] py-1 px-4 ml-3 shadow-md">20</span></p>

                <div className="mt-[50px] flex gap-[25px] items-center w-full flex-wrap justify-center">
                    <RenderingNFTs
                        with_slice={true}
                        nftsData={nftsData} />
                </div>

                {
                    Boolean(nftsData.results) && <div className="mt-[5rem]">

                        <Link
                            to={"/nftMarketPlace"}
                            state={{
                                id: "13"
                            }}
                        >
                            <button
                                // onClick={handleLog}

                                // onClick={() => history("/nftMarketPlace", {
                                //     state: {

                                //     }
                                // })}
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
                        </Link>
                    </div>
                }

                {
                    loadBestSelled.id && <div className="px-[1.5vw] mt-[10rem]">
                        <div className="mt-[5rem] flex flex-wrap gap-[1rem] justify-between mb-[2rem]">
                            <div className="flex rows gap-[1rem] items-center">
                                <p className="text-xl font-MontSemiBold ">Featured Products</p>
                                <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md flex items-center gap-[.25rem]">
                                    <div className='point'></div> The Best Choice</span>
                            </div>

                            <div
                                // onClick={handleLog}
                                className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                        hover:bg-white hover:text-black
                                        text-sm font-MontSemiBold
                                            py-1 text-white px-3
                                            rounded-lg">
                                <p>Latest added</p>
                            </div>

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

                                    <h2 className="text-[2rem] font-MontSemiBold text-white mt-[1rem]">{loadBestSelled?.title}</h2>

                                    <p className="text-center text-white text-sm mt-[1rem]">{loadBestSelled?.description}</p>
                                </div>

                                <h2 className="text-[1rem] font-MontRegular text-white mt-[2rem] mb-[-.24rem] text-center uppercase">Price</h2>
                                <div className="text-center mt-[1rem]">
                                    <div className="text-[2rem] mb-1 text-white font-MontSemiBold">{loadBestSelled.price} ETH</div>
                                </div>

                                <div className="mt-[1rem] flex items-center gap-[2rem] justify-center flex-wrap">

                                    {
                                        loadBestSelled.id && <Link to={"/nftMarketPlace"}>
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
                                        </Link>
                                    }

                                    {
                                        loadBestSelled.id && <button
                                            onClick={handleSuscribeToSale}
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
                                    }
                                </div>
                            </div>
                            <figure className='w-[50%] max-[750px]:w-[100%] max-[750px]:order-0 relative h-[500px] max-[750px]:h-[350px]'>
                                <img
                                    className="absolute top-0 left-0 right-0 w-[100%] h-[100%] bottom-0 object-fill shadow-lg bg-cover"
                                    src={loadBestSelled.image || ISOTOP2} />
                            </figure>
                        </div>
                    </div>
                }

                {
                    !Boolean(loadBestSelled.id) && <h2 className="text-lg mt-[4rem] font-MontSemiBold text-center">Featured Products not set</h2>
                }

                <p className="text-xl font-MontSemiBold text-center mt-[7rem]">Ours Partners</p>

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