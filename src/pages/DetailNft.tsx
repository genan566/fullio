import React from 'react'
import { IoArrowBack, IoArrowDown, IoBackspace, IoChevronBackCircleOutline, IoFilter, IoHandLeft } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { RootNftContext, RootUserContext, RootUserTokenContext } from '../contexts'

import NFT10 from "../imgs/10.png";
import ISOTOP from "../imgs/istockphoto.jpg";

import { motion } from "framer-motion"
import { RiShoppingBasket2Line } from 'react-icons/ri';
import { AiTwotoneFire } from 'react-icons/ai';
import { AuthAPI } from '../APIs/AuthApi';
import { routeAPIBaseImage } from '../APIs/APIRoutes';


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
        x: "0",
        y: "-8.5vh",
        opacity: 0,
        transition: { ease: 'easeInOut' },
    }
};



interface UserRetrieveInterface {
    email: string,
    pseudo: string,
    name: string,
    image: string | null,
}

const DetailNft = () => {
    const userContext = React.useContext(RootUserContext)
    const nftContext = React.useContext(RootNftContext)


    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)
    const userTokenContext = React.useContext(RootUserTokenContext)


    const nFTContext = React.useContext(RootNftContext)
    React.useEffect(() => {
        if (nftContext?.nftData?.owner_id) {
            let respAuth = new AuthAPI()
            if (userTokenContext.token !== "") {
                let token = userTokenContext.token

                respAuth
                    .retrive_account(token, nftContext?.nftData?.owner_id)
                    .then(res => {
                        let formatedData = {
                            email: res.email,
                            name: res.name,
                            pseudo: res.pseudo,
                            image: routeAPIBaseImage + res.image.toString(),
                        }
                        setuserRetrieveData(formatedData)
                    })
            }
        }
    }, [nftContext?.nftData?.owner_id])

    return (
        <div
        >
            <div className="px-2">
                <Link
                    to={"/nftMarketPlace"}
                    // onClick={handleLog}
                    className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                        hover:bg-white hover:text-black
                        
                        focus:outline-none mt-9
                        text-xs font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                            py-1 text-white px-3
                            rounded-lg">
                    <IoArrowBack
                        // color="white"
                        size={17}
                    /> <p>Go Back</p>
                </Link>
            </div>
            {/* {
                nftContext?.nftData ? (<>
                    <div className="flex row item-center justify-start gap-4 mt-14 px-4 mb-14 w-fit max-[900px]:flex-wrap">
                        <div className="w-1/2 max-[900px]:w-full" style={{ maxWidth: "800px" }}>
                            <img
                                className="h-fit w-full object-center shadow-lg rounded-lg bg-cover" style={{ maxHeight: 500, minHeight: 300, width: "100%" }}
                                src={nftContext?.nftData?.image || NFT10}
                                alt="user Profile" />
                        </div>
                        <div className="w-1/2 p-4 flex flex-col justify-center 
                                max-[900px]:w-full max-w-[800px] bg-slate-900 rounded-md shadow-lg px-[3rem] border-gray-800 border-2">
                            <h1 className="text-white text-2xl font-MontBold">{nftContext?.nftData?.title || "Non défini"}</h1>
                            <div className="flex row gap-2 w-fit mt-4">

                                {
                                    nftContext?.nftData.categories_trending.map(item => (
                                        <>
                                            <p
                                                className="hover:bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                                                bg-transparent border border-violet-600 hover:text-white
                                                    focus:outline-none
                                                    text-xs font-MontSemiBold
                                                    focus:ring-2
                                                    focus:ring-gray-500
                                                        py-2 text-white px-3
                                                        rounded-full">
                                                {
                                                    item.name === "Best Sold" && <>

                                                        <AiTwotoneFire
                                                            // color="white"
                                                            size={17} />
                                                    </>
                                                }
                                                <p>{item.name}</p>
                                            </p>
                                        </>
                                    ))
                                }
                            </div>
                            <p className="text-xs text-slate-400 font-MontSemiBold mt-4">
                                {nftContext?.nftData?.description || "Non défini"}</p>

                            <div className='mt-5 bottom-divider py-4 mb-5'>
                                <p className="text-xs text-slate-400 font-MontSemiBold">Owned by</p>
                                <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                    <img
                                        className="h-12 w-12 rounded-full object-cover shadow-lg"
                                        src={nftContext?.nftData?.owner_pic || NFT10}
                                        alt="user Profile" />
                                    <p className="text-xs text-white font-MontBold">{nftContext?.nftData?.owner_name || "Non défini"}</p>
                                </div>
                            </div>
                            <div className="">
                                <p className="text-xs text-slate-400 font-MontSemiBold mb-1">Current Price</p>
                                <h1 className="text-xl text-white font-MontSemiBold">ETH {nftContext?.nftData?.price || 0.00}</h1>
                            </div>



                            <div className="flex row gap-5 justify-start items-center w-fit mt-6">
                                <button
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
                                    /> <p>Buy Now</p>
                                </button>

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
                                    <IoArrowDown
                                        // color="white"
                                        size={17}
                                    /> <p>Discover More</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-4">
                        <h1 className="text-lg text-white font-MontSemiBold">
                            Sales History
                        </h1>

                        <div className="bg-slate-800 shadow-lg rounded-md py-1 px-4 mt-4 overflow-y-scroll" style={{
                            minHeight: "80px",
                            maxHeight: "500px"
                        }}>
                            {
                                nftContext?.nftData.sales_history.map((item) => {
                                    return (
                                        <>
                                            <div className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                                                <div className="flex row justify-center items-center">
                                                    <div className="flex gap-2 row items-center justify-start w-fit" >
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                            src={ISOTOP}
                                                            alt="user Profile" />
                                                        <p className="text-sm text-white font-MontSemiBold">{item.title}</p>
                                                    </div>
                                                </div>
                                                <p className="text-orange-500 text-sm font-MontSemiBold">{item?.price}ETH</p>
                                                <p className="text-white text-sm font-MontSemiBold">{item.user_suscribed?.email}</p>
                                                <p className="text-white text-sm font-MontSemiBold">{item.created_at}</p>
                                                <p className="text-white text-sm font-MontSemiBold">{item.will_end_at}</p>
                                                <button
                                                    // onClick={handleLog}
                                                    className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                                    hover:bg-white hover:text-black
                                                    
                                                    focus:outline-none
                                                    text-xs font-MontSemiBold
                                                    focus:ring-2 py-2
                                                    focus:ring-gray-500
                                                        text-white px-3
                                                        rounded-lg">
                                                    Learn More
                                                </button>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {
                                nftContext?.nftData.sales_history.length === 0 && <div className="text-center">
                                    <h1 className="text-white text-xs font-MontBold mt-5">Historique NFT vide.</h1>
                                    <h1 className="text-white text-xs font-MontBold mt-2">Veuillez bien vous souscrire au NFT pour avoir un suivi</h1>
                                </div>
                            }
                        </div>
                    </div>
                </>) : (<div className='text-center'>
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée n'est à afficher pour l'instant.</h1>

                </div>)
            } */}

            <div className="flex gap-2 mt-[5rem] justify-center">
                <figure className="w-[35vw] max-w-[700px] min-h-[500px] max-h-[550px] relative overflow-hidden
                rounded-lg min-w-[280px] bg-zinc-700 shadow-md flex items-center justify-center">
                    <img
                        className="h-full w-full absolute inset-0 z-[1] object-cover "
                        src={nftContext?.nftData?.image || NFT10}
                        alt="user Profile" />
                </figure>

                <div className="p-[2rem] bg-slate-800 rounded-lg shadow-md w-full max-w-[650px]">
                    <h1 className="text-white text-2xl font-MontBold">{nftContext?.nftData?.title || "Non défini"}</h1>
                    <div className="flex row gap-2 w-fit mt-4">

                        {
                            nftContext?.nftData?.categories_trending.map(item => (
                                <>
                                    <p
                                        className="hover:bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                                                bg-transparent border border-violet-600 hover:text-white
                                                    focus:outline-none
                                                    text-xs font-MontSemiBold
                                                    focus:ring-2
                                                    focus:ring-gray-500
                                                        py-2 text-white px-3
                                                        rounded-full">
                                        {
                                            item.name === "Best Sold" && <>

                                                <AiTwotoneFire
                                                    // color="white"
                                                    size={17} />
                                            </>
                                        }
                                        <p>{item.name}</p>
                                    </p>
                                </>
                            ))
                        }
                    </div>
                    <p className="text-xs text-slate-400 font-MontSemiBold mt-4 max-w-[550px]">
                        {nftContext?.nftData?.description || "Non défini"}</p>

                    <div className='mt-5 bottom-divider py-4 mb-5'>
                        <p className="text-xs text-slate-400 font-MontSemiBold">Owned by</p>
                        <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                            <img
                                className="h-12 w-12 rounded-full object-cover shadow-lg"
                                src={userRetrieveData.image || NFT10}
                                alt="user Profile" />
                            <p className="text-xs text-white font-MontBold">{userRetrieveData.name || "Non défini"}</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-xs text-slate-400 font-MontSemiBold mb-1">Current Price</p>
                        <h1 className="text-xl text-white font-MontSemiBold">ETH {nftContext?.nftData?.price || 0.00}</h1>
                    </div>



                    <div className="flex row gap-5 justify-start items-center w-fit mt-6">
                        <button
                            // onClick={handleLog}
                            className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-[1rem]
                                            rounded-lg">
                            <RiShoppingBasket2Line
                                // color="white"
                                size={17}
                            /> <p>Follow Now</p>
                        </button>

                        {/* <button
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
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="px-4 mt-[5rem]">
                <h1 className="text-lg text-white font-MontSemiBold">
                    Sales History
                </h1>

                <div className="bg-slate-800 shadow-lg rounded-md py-1 px-4 mt-4 overflow-y-scroll" style={{
                    minHeight: "80px",
                    maxHeight: "500px"
                }}>
                    {
                        nftContext?.nftData?.sales_history.map((item) => {
                            return (
                                <>
                                    <div className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                                        <div className="flex row justify-center items-center">
                                            <div className="flex gap-2 row items-center justify-start w-fit" >
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                    src={ISOTOP}
                                                    alt="user Profile" />
                                                <p className="text-sm text-white font-MontSemiBold">{item.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-orange-500 text-sm font-MontSemiBold">{item?.price}ETH</p>
                                        <p className="text-white text-sm font-MontSemiBold">{item.user_suscribed?.email}</p>
                                        <p className="text-white text-sm font-MontSemiBold">{item.created_at}</p>
                                        <p className="text-white text-sm font-MontSemiBold">{item.will_end_at}</p>
                                        <button
                                            // onClick={handleLog}
                                            className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                                    hover:bg-white hover:text-black
                                                    
                                                    focus:outline-none
                                                    text-xs font-MontSemiBold
                                                    focus:ring-2 py-2
                                                    focus:ring-gray-500
                                                        text-white px-3
                                                        rounded-lg">
                                            Learn More
                                        </button>
                                    </div>
                                </>
                            )
                        })
                    }
                    {
                        nftContext?.nftData?.sales_history.length === 0 && <div className="text-center">
                            <h1 className="text-white text-xs font-MontBold mt-5">Historique NFT vide.</h1>
                            <h1 className="text-white text-xs font-MontBold mt-2">Veuillez bien vous souscrire au NFT pour avoir un suivi</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailNft