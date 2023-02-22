import React from 'react'
import { AiTwotoneFire } from 'react-icons/ai';
import { IoArrowForward, IoPeople, IoTrash } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { AuthAPI } from '../APIs/AuthApi';
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI';
import { RootNftContext, RootUserContext, RootUserTokenContext, } from '../contexts';

import ISOTOP from "../imgs/istockphoto.jpg";
import { CategoriesTrending } from '../types/CategorieTrendingType';
import { NftTypesValues } from '../types/NFTTypes';
import { SaleHistory } from '../types/SaleHistoryType';
import { UserRetrieveInterface2 } from '../types/UserRetrieveTypes';



const CardNFT = ({ image, categories_trending, owner, rebirth, data, link = false, customLink }: {
    image?: string, sales_history?: number[], owner?: number,
    categories_trending?: number[], rebirth?: string, data?: NftTypesValues, link?: boolean, customLink?: string
}) => {

    const userContext = React.useContext(RootUserContext)

    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface2>({} as UserRetrieveInterface2)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])

    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])


    const nFTContext = React.useContext(RootNftContext)

    React.useEffect(() => {
        if (owner) {
            let respAuth = new AuthAPI()
            if (userTokenContext.token !== "") {
                let token = userTokenContext.token

                try {
                    respAuth
                        .retrive_account(token, owner)
                        .then(res => {
                            let formatedData = {
                                email: res.email,
                                name: res.name,
                                pseudo: res.pseudo,
                                image: ((res.image === null ? "" : routeAPIBaseImage + res.image.toString())),
                            }
                            setuserRetrieveData(formatedData)
                        })
                }
                catch (error) {
                    console.log("Une erreur est survenue")
                }
            }
        }
    }, [owner])

    const load_categories = async () => {
        if (Boolean(categories_trending?.length)) {
            {

                // categories_trending.map(it => {
                //     let idX = it
                //     let categories_trendings = new CategoriesTrendingAPI()
                //     categories_trendings
                //         .get_categorie(idX)
                //         .then(data => {
                //             let checker = { id: data.id, name: data.name }
                //             if ((categorie?.id !== checker.id) && categorie?.name !== checker.name) {
                //                 setCategorie(data)
                //             }
                //         })
                // })

                let categories_trendings = new CategoriesTrendingAPI()
                categories_trendings
                    .get_multi_categorie(categories_trending)
                    .then(data => {
                        if (data.results.length > 0) {
                            setCategories([...data.results])
                        }
                    })
            }
        }
    }

    React.useEffect(() => {
        load_categories()
    }, [categories_trending])

    React.useEffect(() => {
        load_sale_histories()
    }, [data?.id])

    const load_sale_histories = async () => {
        let sales_getted = data?.id
        if (Boolean(sales_getted)) {
            let salesHistories_trendings = new SaleHistoriesAPI()
            salesHistories_trendings
                .get_multi_sales_by_nftID(sales_getted)
                .then(datas => {
                    if (datas.length > 0) {
                        setSaleHistories([...datas])
                    }
                })
        }
    }

    const calculatedSalesAdded = React.useMemo(() => {
        if (saleHistories.length > 0) {
            return saleHistories.length > 1000 ? `${saleHistories.length / 1000}K`
                : saleHistories.length > 1000000 ? `${saleHistories.length / 1000000}M` : saleHistories.length
        } else {
            return 0
        }
    }, [saleHistories])

    return (

        <>
            <div
                className='customNFTT'
            >
                <div className='w-[330px] bg-slate-900 shadow-md rounded-md overflow-hidden relative'>
                    {
                        userContext.user.is_superuser && <button
                            className="absolute top-[.58rem] right-[.58rem] p-2 rounded-full bg-red-500 text-white 
                            shadow-md active:text-red-500 active:bg-transparent border border-transparent active:border-red-500">
                            <IoTrash
                                // color="white"
                                size={17}
                            />
                        </button>
                    }
                    <img
                        className="h-[300px] w-full rounded-sm object-cover bg-cover shadow-lg"
                        src={image || ISOTOP}
                        alt="user Profile" />
                    <div className="p-5">
                        <p className=" font-MontSemiBold text-md max-h-[2rem] truncate">{rebirth || "Non défini"}</p>



                        <div className="flex mt-3 gap-[1rem] flex-wrap">
                            {
                                categories.map(item => {

                                    return (
                                        <>
                                            <p key={`${item.id + new Date().getTime()}`}
                                                className={item.name === "Not Disponible" ?
                                                    "hover:bg-red-600 flex row items-center justify-center gap-1 w-fit bg-transparent border border-red-600 hover:text-white focus:outline-none text-[.7rem] font-MontSemiBold focus:ring-2 focus:ring-gray-500 py-[.25rem] text-red-500 px-3 rounded-full"
                                                    :
                                                    "hover:bg-violet-600 flex row items-center justify-center gap-1 w-fit bg-transparent border border-violet-600 hover:text-white focus:outline-none text-[.7rem] font-MontSemiBold focus:ring-2 focus:ring-gray-500 py-[.25rem] text-white px-3 rounded-full"}>


                                                {
                                                    item.name === "Best Sold" && <>

                                                        <AiTwotoneFire
                                                            // color="white"
                                                            size={17} />
                                                    </>
                                                }
                                                <p key={`${item.id + new Date().getTime()}`}>{item.name}</p>
                                            </p>
                                        </>
                                    )
                                })
                            }

                            {
                                categories.length === 0 && <div className="">
                                    <h1 className="text-red-500 text-[.7rem] font-MontBold">Categories not Defined</h1>
                                </div>
                            }
                        </div>

                        {
                            (Boolean(userRetrieveData)) &&
                            <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                <img
                                    className="h-10 w-10 rounded-full object-cover shadow-lg"
                                    src={userRetrieveData.image || ISOTOP}
                                    alt="user Profile" />
                                <p className="text-sm text-white font-MontBold max-h-[2rem] truncate w-3/4">{userRetrieveData.name || "Non défini"}</p>
                            </div>
                        }

                        <p className="text-[1.2rem] mb-1 mt-2 text-indigo-500 font-MontSemiBold">ETH {data?.price}</p>

                        <div className="flex row justify-between mt-[.5rem] mb-[.5rem] items-center">
                            <p className="text-white font-MontSemiBold text-xs">Nbr Subscription</p>
                            <div className='flex gap-[.5rem]'>
                                <IoPeople
                                    color="white"
                                    size={15}
                                />
                                <h2
                                    className={'text-[.8rem] text-white font-MontSemiBold'}>{calculatedSalesAdded || 0}</h2>
                            </div>
                        </div>

                        <Link
                            to={customLink || "/detailNFT"}
                            onClick={(e) => {
                                data && nFTContext?.setNftData(data)
                            }}>
                            <button className='px-[.5rem] bg-indigo-500 text-white py-[.2rem] 
                            flex gap-[.25rem] mt-[1rem] items-center justify-center rounded-md'>
                                <p className=" font-MontSemiBold text-xs">View details</p>
                                <IoArrowForward
                                    // color="white"
                                    size={17}
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardNFT