import React from 'react'

import { IoArrowBack, IoArrowForward, IoSearch } from "react-icons/io5";

import { RiAddFill, RiShoppingBasket2Line } from "react-icons/ri";


import { motion } from "framer-motion"
import { RootCreatorContext, RootUserContext, } from '../contexts';
import { NftsAPI } from '../APIs/NftsAPI';
import { Link, useNavigate } from 'react-router-dom';
import CardNFT from '../components/CardNFT';
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NftsInterface } from '../types/NFTsInterface';
import { CategoriesTrending } from '../types/CategorieTrendingType';
import { NftTypesValues } from '../types/NFTTypes';
import RenderingNFTs from '../components/RenderingNFTs';
import { useAppDispatch } from '../hooks/modalsHooks';
import { TOGGLE_MODAL_FOR_LOGIN } from '../redux/constants/ModalsConstants';


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



export interface PaginatedData {
    results: NftsInterface[],
    count: number,
    next: string,
    previous: string,
}

type Inputs = {
    search: string,
};

const ContainerPrincipal = () => {
    const userContext = React.useContext(RootUserContext)
    const creatorContext = React.useContext(RootCreatorContext)
    const [nftsData, setnftsData] = React.useState<PaginatedData>({} as PaginatedData)
    const [castedCount, setCastedCount] = React.useState<number[]>([])
    const [categoriesTrending, setCategoriesTrending] = React.useState<CategoriesTrending[]>([])
    const [activeCategoriesTrending, setActiveCategoriesTrending] = React.useState<number>(0)
    const [activePage, setActivePage] = React.useState(1)
    const [search, setSearch] = React.useState("")

    const history = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const dispatch = useAppDispatch();

    const callingTheNestedData = (index: number) => {
        if (activeCategoriesTrending) {
            let resNFTs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(index)
            resNFTs.get_all_nfts_paginate_by_categories(activeCategoriesTrending, index)
                .then(data => setnftsData(data))
        }

        if (search) {
            let resNFTs = new NftsAPI()
            setActiveCategoriesTrending(0)
            window.scrollTo(0, 200)
            setActivePage(index)
            resNFTs.get_all_nfts_paginate_by_search(search, index)
                .then(data => setnftsData(data))
        }

        else {
            let resNFTs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(index)
            resNFTs.get_all_nfts(index).then(data => setnftsData(data))
        }
    }

    const prefixedPaginate = (it: number) => {
        if (activeCategoriesTrending) {

            let respFaqs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(it)
            respFaqs.get_all_nfts_paginate_by_categories(activeCategoriesTrending, it)
                .then(data => setnftsData(data))

        }

        if (search) {
            setActiveCategoriesTrending(0)
            let respFaqs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(it)
            respFaqs.get_all_nfts_paginate_by_search(search, it)
                .then(data => setnftsData(data))
        }

        else {

            let respFaqs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(it)
            respFaqs.get_all_nfts(it).then(data => setnftsData(data))
        }

    }

    const initial_fetching_nfts = () => {
        let resNFTs = new NftsAPI()
        resNFTs.get_all_nfts().then(data => setnftsData(data))
    }

    React.useEffect(() => {
        initial_fetching_nfts()
        let categories_trendings = new CategoriesTrendingAPI()
        categories_trendings.get_all_categories().then(data => {
            setCategoriesTrending(data.results)
        })
    }, [])


    const activeCategorieFilteringCallbacks = React.useCallback(() => {
        if (activeCategoriesTrending !== 0) {
            let resNFTs = new NftsAPI()
            resNFTs
                .get_filtered_by_trendingIDs_nfts(activeCategoriesTrending)
                .then(data => {
                    setnftsData(data)
                    setActivePage(1)
                })
        } else
            initial_fetching_nfts()
    }, [activeCategoriesTrending])

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (data.search.length > 0) {
            setActiveCategoriesTrending(0)
            setSearch(data.search)
            let resNFTs = new NftsAPI()
            resNFTs
                .get_filtered_by_search_nfts(data.search)
                .then(data => {
                    setnftsData(data)
                    setActivePage(1)
                })
        }

        else {
            initial_fetching_nfts()
        }
    }


    React.useEffect(() => {
        activeCategorieFilteringCallbacks()
    }, [activeCategorieFilteringCallbacks])


    React.useEffect(() => {
        if (nftsData.count !== 0) {
            let calculatedNumbersPage = parseInt(((nftsData.count) / 10).toFixed(0))
            let check_Can_add_Or_Not = (calculatedNumbersPage * 10) >= nftsData.count

            if (check_Can_add_Or_Not) {
                setCastedCount(Array.from(Array(calculatedNumbersPage).keys()).map(i => i + 1))
            } else {
                !Number.isNaN(calculatedNumbersPage) && setCastedCount(Array.from(Array((calculatedNumbersPage + 1)).keys()).map(i => i + 1))
            }
        }
        else {
            setCastedCount([])
        }

    }, [nftsData.count])

    return (

        <motion.div
            className='relative'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className="">

                <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">

                    <div className="container-img-content">
                        <p className="text-[2.2rem] max-[450px]:text-[1.5rem] max-[450px]:leading-[2rem]  text-slate-50 font-MontBold leading-[3.5rem] text-center w-full">Page Products
                            <span className="block animated_gradient_bg textS">NFTs marketplace</span></p>
                        <div className="mx-auto">

                            <button
                                onClick={() => {
                                    if (!Boolean(userContext.user.id)) {
                                        dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                                    }
                                    else {
                                        !userContext?.user?.is_staff && creatorContext?.setisCreator(true)
                                        userContext?.user?.is_staff && history("/createNFt")
                                    }

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
                                /> <p>Create your own one </p>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="mb-3">
                    <h2 className="text-[1.8rem] font-MontBold text-white">Trending Auctions</h2>
                    <div className="flex mt-2 gap-4 row max-[900px]:flex-wrap align-center">
                        <div className="flex mt-2 gap-4 max-[900px]:gap-[1rem] flex-wrap row">

                            {
                                userContext.user.is_superuser && <button
                                    // onClick={() => {
                                    //     setActiveCategoriesTrending(0);
                                    // }}
                                    className={"bg-indigo-500 text-sm text-slate-200 p-[1rem] rounded-md shadow-sm font-MontSemiBold py-[.5rem] flex "
                                    }>Add categorie<RiAddFill
                                        // color="white"
                                        size={17}
                                    /> </button>
                            }

                            <button
                                onClick={() => {
                                    setActiveCategoriesTrending(0);
                                }}
                                className={activeCategoriesTrending === 0 ?
                                    "bg-indigo-500 text-sm text-slate-200 p-[1rem] rounded-md shadow-sm font-MontSemiBold py-[.5rem]"
                                    : "p-[1rem] rounded-md shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm"}>Default</button>

                            {
                                categoriesTrending.map(it => {
                                    return (
                                        <>
                                            <button key={it.id}
                                                onClick={() => {
                                                    setActiveCategoriesTrending(it.id);
                                                }}
                                                className={it.id === activeCategoriesTrending ?
                                                    "bg-indigo-500 text-sm text-slate-200 p-[1rem] rounded-md shadow-sm font-MontSemiBold py-[.5rem]"
                                                    : "p-[1rem] rounded-md shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem] hover:bg-indigo-500 text-sm"}>{it.name}</button>
                                        </>
                                    )
                                })
                            }

                        </div>
                        <div className='max-w-[200px]'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="control-container-S mt-3 mb-1 shadow-lg" id='cPar'>
                                    <IoSearch
                                        color="white"
                                        size={18}
                                    />
                                    <input
                                        // value={search}
                                        {...register("search")}
                                        // onChange={(ev) => setSearch(ev.target.value)}
                                        placeholder='Your search'
                                        type="text"
                                        className="control-input-S" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-5 mt-10 align-center pb-10 max-[898px]:overflow-x-scroll min-[900px]:flex-wrap max-[898px]:max-w-[80vw]">
                    <RenderingNFTs
                        with_slice={false}
                        nftsData={nftsData} />
                </div>


                {
                    !(Object.keys(nftsData).length === 0) && <div className="mx-auto flex flex-wrap gap-2 items-center justify-center mt-[1rem]">
                        {
                            nftsData.previous && <button
                                onClick={() => callingTheNestedData(activePage - 1)}
                                className="bg-indigo-500 w-fit px-2 h-[2rem] gap-[.25rem] rounded-full text-white flex items-center justify-center shadow-md">
                                <IoArrowBack
                                    color="white"
                                    size={15}
                                />
                                <p className=" font-MontSemiBold text-xs">Previous</p>
                            </button>
                        }
                        {
                            castedCount.map(it => (<>
                                <button
                                    onClick={() => prefixedPaginate(it)}
                                    className={activePage === it ? "bg-white w-[2rem] h-[2rem] rounded-full text-black shadow-md" :
                                        "bg-indigo-500 w-[2rem] h-[2rem] rounded-full text-white shadow-md"}>{it}</button>
                            </>))
                        }
                        {
                            nftsData.next && <button
                                onClick={() => callingTheNestedData(activePage + 1)}
                                className="bg-indigo-500 w-fit gap-[.25rem] px-2 h-[2rem] rounded-full text-white flex items-center justify-center shadow-md">
                                <p className=" font-MontSemiBold text-xs">Next</p>
                                <IoArrowForward
                                    color="white"
                                    size={15}
                                />
                            </button>
                        }
                    </div>
                }
            </div>
        </motion.div>
        // </div>
    )
}

export default ContainerPrincipal