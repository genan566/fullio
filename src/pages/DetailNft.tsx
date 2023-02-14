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
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { actionShowModalForSuscription } from '../redux/actions/ModalsActions';
import { useAppDispatch, useAppSelector } from '../hooks/modalsHooks';
import { TOGGLE_MODAL_SUSCRIPTION } from '../redux/constants/ModalsConstants';
const DetailNft = () => {
    const nftContext = React.useContext(RootNftContext)

    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)
    const [userRetrieveDataListForSales, setuserRetrieveDataListForSales] = React.useState<UserRetrieveInterface[]>([])
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])
    const [categorie, setCategorie] = React.useState<CategoriesTrending | null>(null)
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const userTokenContext = React.useContext(RootUserTokenContext)

    const location = useLocation();
    const { showModalSuscription } = useAppSelector((state: RootState) => state.modalsReducer)

    const dispatch = useAppDispatch();


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
        let categories_getted = nftContext?.nftData?.categories_trending
        if (Boolean(categories_getted?.length)) {
            let categories_trendings = new CategoriesTrendingAPI()
            categories_trendings
                .get_multi_categorie(categories_getted)
                .then(data => {
                    if (data.results.length > 0) {
                        setCategories([...data.results])
                    }
                })


        }
    }

    const load_sale_histories = async () => {
        let sales_getted = nftContext?.nftData?.id
        if (Boolean(sales_getted)) {
            let salesHistories_trendings = new SaleHistoriesAPI()
            salesHistories_trendings
                .get_multi_sales_by_nftID(sales_getted)
                .then(data => {
                    if (data.results.length > 0) {
                        setSaleHistories([...data.results])
                        data.results.map((item: any) => {
                            let respAuth = new AuthAPI()
                            if (userTokenContext.token !== "") {
                                let token = userTokenContext.token
                                respAuth
                                    .retrive_account(token, item.user_suscribed)
                                    .then(res => {
                                        let formatedData = {
                                            email: res.email,
                                            id: res.id,
                                            name: res.name,
                                            pseudo: res.pseudo,
                                            is_superuser: res.is_superuser,
                                            is_staff: res.is_staff,
                                            image: routeAPIBaseImage + res.image.toString(),
                                        }

                                        setuserRetrieveDataListForSales([...userRetrieveDataListForSales, formatedData])

                                    })
                            }
                        })
                    }
                })
        }
    }

    const handleSuscribeToSale = () => {
        let token = userTokenContext.token
        // dispatch(actionShowModalForSuscription(true))

        dispatch({ type: TOGGLE_MODAL_SUSCRIPTION, payload: true })


    }

    React.useEffect(() => {
        load_sale_histories()
        console.log("idiot")
    }, [nftContext?.nftData?.sales_history, showModalSuscription])

    React.useEffect(() => {
        load_categories()
    }, [nftContext?.nftData?.categories_trending])



    return (
        <div
        >
            <div className="">
                <button
                    // to={location.pathname === "/detailOwnNFT" ? "/manageNFTs" : "/nftMarketPlace"}
                    onClick={() => window.history.back()}
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
                </button>
            </div>
            <div className="flex gap-2 mt-[5rem] max-[700px]:flex-wrap justify-center items-center">
                <figure className="w-[35vw]  max-[700px]:max-w-[100%] max-[700px]:w-[100%] max-w-[700px] min-h-[500px] max-h-[550px] relative overflow-hidden
                rounded-lg min-w-[280px] bg-zinc-700 shadow-md flex items-center justify-center">
                    <img
                        className="h-full w-full absolute inset-0 z-[1] object-cover "
                        src={nftContext?.nftData?.image || NFT10}
                        alt="user Profile" />
                </figure>

                <div className="w-full max-w-[650px]">
                    <div className="p-[2rem] bg-slate-800 rounded-lg shadow-md w-full max-[700px]:max-w-[100%] max-w-[650px]">
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



                        <div className="flex gap-5 justify-start items-center w-full mt-6">
                            <button
                                disabled={!Boolean(userTokenContext.token.length)}
                                onClick={handleSuscribeToSale}
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
                                /> <p>Suscribe Now</p>
                            </button>
                            {
                                !Boolean(userTokenContext.token.length) && <p className="text-sm text-red-400">Please login to subscribe</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 mt-[5rem]">
                <h1 className="text-lg text-white font-MontSemiBold">
                    Sales History 
                </h1>
                <p className='text-sm mt-1 mb-[2rem]'>We counts <span className="font-MontSemiBold">{saleHistories.length}</span> sales subscription.</p>

                <div className="bg-slate-800 shadow-lg rounded-md py-1 px-4 mt-4 overflow-y-scroll" style={{
                    minHeight: "80px",
                    maxHeight: "500px"
                }}>
                    {
                        saleHistories.map((item) => {
                            let retrievingUser = userRetrieveDataListForSales.find((it => it.id === item.user_suscribed))

                            return (
                                <>
                                    <div className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                                        <div className="flex row justify-center items-center">
                                            <div className="flex gap-2 row items-center justify-start w-fit" >
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                    src={retrievingUser?.image || ISOTOP}
                                                    alt="user Profile" />
                                                <p className="text-sm text-white font-MontSemiBold">{item.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-white text-sm font-MontSemiBold">{retrievingUser?.email || "Anonyme"}</p>
                                        <p className="text-orange-500 text-sm font-MontSemiBold">{item?.price}ETH</p>
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
        </div >
    )
}

export default DetailNft