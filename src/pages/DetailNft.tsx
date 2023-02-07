import React from 'react'
import { IoArrowBack, } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { RootNftContext, RootUserTokenContext, } from '../contexts'

import NFT10 from "../imgs/10.png";
import ISOTOP from "../imgs/istockphoto.jpg";

import { RiShoppingBasket2Line } from 'react-icons/ri';
import { AiTwotoneFire } from 'react-icons/ai';
import { AuthAPI } from '../APIs/AuthApi';
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI';
import { UserRetrieveInterface } from '../types/UserRetrieveTypes';
import { CategoriesTrending } from '../types/CategorieTrendingType';
import { SaleHistory } from '../types/SaleHistoryType';


const DetailNft = () => {
    const nftContext = React.useContext(RootNftContext)

    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])
    const [categorie, setCategorie] = React.useState<CategoriesTrending | null>(null)
    const [saleHistorie, setSaleHistory] = React.useState<SaleHistory | null>(null)
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const userTokenContext = React.useContext(RootUserTokenContext)


    React.useEffect(() => {

        if (saleHistorie !== null) {
            let checker = saleHistories.filter(it => it.title === saleHistorie.title)
            if (checker.length === 0) {
                setSaleHistories([...saleHistories, saleHistorie])
            }
        }
    }, [saleHistorie])

    React.useEffect(() => {

        if (categorie !== null) {
            let checker = categories.filter(it => it.id === categorie.id)
            if (checker.length === 0) {
                setCategories([...categories, categorie])
            }
        }
    }, [categorie])

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
                            is_superuser: res.is_superuser,
                            is_staff: res.is_staff,
                            image: routeAPIBaseImage + res.image.toString(),
                        }
                        setuserRetrieveData(formatedData)
                    })
            }
        }
    }, [nftContext?.nftData?.owner_id])


    const load_categories = async () => {
        if (nftContext?.nftData?.categories_trending.toString() !== "[]") {

            nftContext?.nftData?.categories_trending.map(it => {
                let idX = it
                let categories_trendings = new CategoriesTrendingAPI()
                categories_trendings
                    .get_categorie(idX)
                    .then(data => {
                        let checker = { id: data.id, name: data.name }
                        if ((categorie?.id !== checker.id) && categorie?.name !== checker.name) {
                            setCategorie(data)
                        }
                    })
            })

        }
    }

    const load_sale_histories = async () => {
        if (nftContext?.nftData?.sales_history.toString() !== "[]") {

            nftContext?.nftData?.sales_history.map(it => {
                let idX = it
                let sales_historys = new SaleHistoriesAPI()
                sales_historys
                    .get_sales_by_ID(idX)
                    .then(data => {
                        let checker = data
                        if ((saleHistorie?.title !== checker.title) && saleHistorie?.price !== checker.price) {
                            setSaleHistory(data)
                        }
                    })
            })

        }
    }

    React.useEffect(() => {
        load_sale_histories()
    }, [nftContext?.nftData?.sales_history])

    React.useEffect(() => {
        load_categories()
    }, [nftContext?.nftData?.categories_trending])


    const location = useLocation();



    return (
        <div
        >
            <div className="px-2">
                <Link
                    to={location.pathname === "/detailOwnNFT" ? "/manageNFTs" : "/nftMarketPlace"}
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
                            categories.map(item => {

                                return (
                                    <>
                                        <p
                                            className={item.name === "Not Disponible" ?
                                                "hover:bg-red-600 flex row items-center justify-center gap-1 w-fit bg-transparent border border-red-600 hover:text-white focus:outline-none text-xs font-MontSemiBold focus:ring-2 focus:ring-gray-500 py-2 text-red-500 px-3 rounded-full"
                                                :
                                                "hover:bg-violet-600 flex row items-center justify-center gap-1 w-fit bg-transparent border border-violet-600 hover:text-white focus:outline-none text-xs font-MontSemiBold focus:ring-2 focus:ring-gray-500 py-2 text-white px-3 rounded-full"}>


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
                                )
                            })
                        }

                        {
                            categories.length === 0 && <div className="text-center w-full">
                                <h1 className="text-red-500 text-sm font-MontBold">Categories not Defined</h1>
                            </div>
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
                            /> <p>Buy Now</p>
                        </button>

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
                        saleHistories.map((item) => {
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
                                        <p className="text-white text-sm font-MontSemiBold">{item.user_suscribed}</p>
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
                        saleHistories.length === 0 && <div className="text-center">
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