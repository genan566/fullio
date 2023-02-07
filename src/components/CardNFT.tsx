import React from 'react'
import { AiTwotoneFire } from 'react-icons/ai';
import { IoArrowForward, IoPeople } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { AuthAPI } from '../APIs/AuthApi';
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';
import { RootNftContext, RootUserTokenContext, } from '../contexts';

import ISOTOP from "../imgs/istockphoto.jpg";
import { CategoriesTrending } from '../types/CategorieTrendingType';
import { NftTypesValues } from '../types/NFTTypes';
import { UserRetrieveInterface2 } from '../types/UserRetrieveTypes';



const CardNFT = ({ image, categories_trending, owner, rebirth, data, link = false, customLink }: {
    image?: string, sales_history?: number[], owner?: number,
    categories_trending?: number[], rebirth?: string, data?: NftTypesValues, link?: boolean, customLink?: string
}) => {


    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface2>({} as UserRetrieveInterface2)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])
    const [categorie, setCategorie] = React.useState<CategoriesTrending | null>(null)


    const nFTContext = React.useContext(RootNftContext)

    React.useEffect(() => {
        if (owner) {
            let respAuth = new AuthAPI()
            if (userTokenContext.token !== "") {
                let token = userTokenContext.token

                respAuth
                    .retrive_account(token, owner)
                    .then(res => {
                        let formatedData = {
                            email: res.email,
                            name: res.name,
                            pseudo: res.pseudo,
                            image: routeAPIBaseImage + (res.image.toString() || ""),
                        }
                        setuserRetrieveData(formatedData)
                    })
            }
        }
    }, [owner])

    const load_categories = async () => {
        if (categories_trending !== undefined) {
            {

                categories_trending.map(it => {
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
    }

    React.useEffect(() => {
        load_categories()
    }, [categories_trending])

    React.useEffect(() => {

        if (categorie !== null) {
            let checker = categories.filter(it => it.id === categorie.id)
            if (checker.length === 0) {
                setCategories([...categories, categorie])
            }
        }
    }, [categorie])

    return (

        <>
            {/* {
                link ? <>

                    <div
                        className='customNFTT'
                    >
                        <div className='w-[330px] bg-slate-900 shadow-md rounded-md overflow-hidden'>
                            <img
                                className="h-[300px] w-full rounded-sm object-cover bg-cover shadow-lg"
                                src={image || ISOTOP}
                                alt="user Profile" />
                            <div className="p-5">
                                <p className=" font-MontSemiBold text-md max-h-[2rem] truncate">{rebirth || "Non défini"}</p>

                                <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                    <img
                                        className="h-10 w-10 rounded-full object-cover shadow-lg"
                                        src={userRetrieveData.image || ISOTOP}
                                        alt="user Profile" />
                                    <p className="text-sm text-white font-MontBold max-h-[2rem] truncate w-3/4">{userRetrieveData.name || "Non défini"}</p>
                                </div>

                                <p className="text-[1.2rem] mb-1 mt-2 text-indigo-500 font-MontSemiBold">ETH {data?.price}</p>
                                <div className="flex row justify-between mt-[.5rem] mb-[.5rem] items-center">
                                    <p className="text-white font-MontSemiBold text-xs">Nbr Follows</p>
                                    <div className='flex gap-[.5rem]'>
                                        <IoPeople
                                            color="white"
                                            size={15}
                                        />
                                        <h2
                                            className={data?.sales_history.length !== 0 ? 'text-[.8rem] text-indigo-500 font-MontSemiBold' :
                                                'text-[.8rem] text-red-500 font-MontSemiBold'}>{data?.sales_history.length}</h2>
                                    </div>
                                </div>

                                <Link
                                    to={customLink || "/detailNFT"}
                                    onClick={(e) => {
                                        data && nFTContext?.setNftData(data)
                                    }}>
                                    <button className='px-[.5rem] bg-indigo-500 text-white py-[.2rem] flex gap-[.25rem] mt-[.5rem] items-center justify-center rounded-lg'>
                                        <p className=" font-MontSemiBold text-xs">View details</p>
                                        <IoArrowForward
                                            // color="white"
                                            size={20}
                                        />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </> : <>
                    <div className='min-w-[300px] w-[330px] bg-slate-900 shadow-md rounded-md overflow-hidden'>
                        <img
                            className="h-[300px] w-full rounded-sm object-cover bg-cover shadow-lg"
                            src={image || ISOTOP}
                            alt="user Profile" />
                        <div className="p-5">
                            <p className=" font-MontSemiBold text-md max-h-[2rem] truncate">{rebirth || "Non défini"}</p>

                            <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                <img
                                    className="h-10 w-10 rounded-full object-cover shadow-lg"
                                    src={userRetrieveData.image || ISOTOP}
                                    alt="user Profile" />
                                <p className="text-sm text-white font-MontBold max-h-[2rem] truncate w-3/4">{userRetrieveData.name || "Non défini"}</p>
                            </div>

                            <p className="text-[1.2rem] mb-1 mt-2 text-indigo-500 font-MontSemiBold">ETH {data?.price}</p>
                            <div className="flex row justify-between mt-[.5rem] mb-[.5rem] items-center">
                                <p className="text-white font-MontSemiBold text-xs">Nbr Follows</p>
                                <div className='flex gap-[.5rem]'>
                                    <IoPeople
                                        color="white"
                                        size={15}
                                    />
                                    <h2
                                        className={data?.sales_history.length !== 0 ? 'text-[.8rem] text-indigo-500 font-MontSemiBold' :
                                            'text-[.8rem] text-red-500 font-MontSemiBold'}>{data?.sales_history.length}</h2>
                                </div>
                            </div>

                            <Link
                                to={customLink || "/detailNFT"}
                                onClick={(e) => {
                                    data && nFTContext?.setNftData(data)
                                }}>
                                <button className='px-[.5rem] bg-indigo-500 text-white py-[.2rem] flex gap-[.25rem] mt-[.5rem] items-center justify-center rounded-lg'>
                                    <p className=" font-MontSemiBold text-xs">View details</p>
                                    <IoArrowForward
                                        // color="white"
                                        size={20}
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            } */}

            <div
                className='customNFTT'
            >
                <div className='w-[330px] bg-slate-900 shadow-md rounded-md overflow-hidden'>
                    <img
                        className="h-[300px] w-full rounded-sm object-cover bg-cover shadow-lg"
                        src={image || ISOTOP}
                        alt="user Profile" />
                    <div className="p-5">
                        <p className=" font-MontSemiBold text-md max-h-[2rem] truncate">{rebirth || "Non défini"}</p>



                        <div className="flex mt-3 gap-[1rem]">
                            {
                                categories.map(item => {

                                    return (
                                        <>
                                            <p
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
                                                <p>{item.name}</p>
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

                        <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                            <img
                                className="h-10 w-10 rounded-full object-cover shadow-lg"
                                src={userRetrieveData.image || ISOTOP}
                                alt="user Profile" />
                            <p className="text-sm text-white font-MontBold max-h-[2rem] truncate w-3/4">{userRetrieveData.name || "Non défini"}</p>
                        </div>

                        <p className="text-[1.2rem] mb-1 mt-2 text-indigo-500 font-MontSemiBold">ETH {data?.price}</p>
                        <div className="flex row justify-between mt-[.5rem] mb-[.5rem] items-center">
                            <p className="text-white font-MontSemiBold text-xs">Nbr Follows</p>
                            <div className='flex gap-[.5rem]'>
                                <IoPeople
                                    color="white"
                                    size={15}
                                />
                                <h2
                                    className={data?.sales_history.length !== 0 ? 'text-[.8rem] text-indigo-500 font-MontSemiBold' :
                                        'text-[.8rem] text-red-500 font-MontSemiBold'}>{data?.sales_history.length}</h2>
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