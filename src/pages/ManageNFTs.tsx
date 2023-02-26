import React from 'react'
import { IoArrowForward, IoFilter } from 'react-icons/io5'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import NFT11 from "../imgs/istockphoto.jpg";

import { motion } from "framer-motion"
import CardNFT from '../components/CardNFT'
import { RootCreatorContext, RootUserContext, RootUserTokenContext } from '../contexts'
import { NftsAPI } from '../APIs/NftsAPI'

import { NftTypesValues } from '../types/NFTTypes';
import { PaginatedDataNFT } from '../types/PaginatedData';


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
    const userContext = React.useContext(RootUserContext)
    const creatorContext = React.useContext(RootCreatorContext)
    const userToken = React.useContext(RootUserTokenContext)
    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)

    const history = useNavigate()

    const check_user_can_create = React.useCallback(() => {
        ((!Boolean(userContext.user.id)) || (Boolean(userContext?.user?.is_staff === false))) && history("/")
        let resNFTs = new NftsAPI()
        let parsedToken = userToken.token
        resNFTs.get_all_nfts_by_user(parsedToken).then(data => { setnftsData(data) })
    }, [userContext?.user])

    React.useEffect(() => {
        check_user_can_create()
    }, [check_user_can_create])


    React.useEffect(() => {
        console.log('nftData', nftsData)
    }, [nftsData])



    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='relative'>

            <div className=''>

                <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                    <div className="container-img-content">
                        <p className="text-[2.5rem] max-[450px]:text-[1.5rem] text-slate-50 font-MontBold leading-[3.5rem] max-[450px]:leading-[2rem] text-center w-full">Personnal Products
                            <span className="block animated_gradient_bg textS">NFTs marketplace</span></p>
                    </div>
                </div>

                <div className="mb-3 mt-[5rem]">
                    <h2 className="text-[1.8rem] font-MontBold text-white">Yours Products</h2>
                    <Link to={"/createNFt"}>
                        <button
                            // onClick={handleLog}
                            onClick={() => {
                                !userContext?.user?.is_staff && creatorContext?.setisCreator(true)
                                userContext?.user?.is_staff && history("/createNFt")
                            }}
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
                    {/* <div className="flex mt-[1.5rem] gap-4 row align-center ">
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
                    </div> */}
                </div>

                <div className="flex max-[500px]:overflow-x-scroll min-[505px]:flex-wrap max-[500px]:max-w-[80vw] py-[1rem] items-center gap-[2rem] mt-[3rem]">
                    {
                        nftsData.results && <>
                            {
                                nftsData.results.map(item => {
                                    let sendedData: NftTypesValues = {
                                        id: item.id,
                                        title: item.title,
                                        description: item.description,
                                        owner_id: item.owner,
                                        image: item.image,
                                        price: item.price,
                                        categories_trending: item.categories_trending,
                                        sales_history: item.sales_history,
                                    }
                                    return (
                                        <>
                                            <CardNFT
                                                data={sendedData}
                                                rebirth={item.title}
                                                owner={item.owner}
                                                key={item.id}
                                                image={item.image}
                                                // link={true}
                                                customLink={`/detailOwnNFT`}
                                                categories_trending={item.categories_trending}
                                                sales_history={item.sales_history}
                                            />
                                        </>
                                    )
                                })
                            }
                        </>
                    }

                    {
                        (Boolean(nftsData.results)) && <div className="text-center w-full">
                            <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée NFTs n'est à afficher pour le moment.</h1>
                        </div>
                    }

                </div>

                {/* <div className="mb-3 mt-[5rem]">
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
                            
                                className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                            hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500
                                py-1 text-white px-3
                                rounded-lg"> <p>View all</p>
                                <IoArrowForward
                                
                                    size={17}
                                />
                            </button></Link>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-[2rem] mt-[3rem]">

                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT11} />

                </div> */}
            </div>

        </motion.div>
    )
}

export default ManageNFTs