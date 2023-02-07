import React from 'react'

import { IoFilter, IoArrowBack, IoArrowForward } from "react-icons/io5";

import { RiShoppingBasket2Line } from "react-icons/ri";


import { motion } from "framer-motion"
import { CategoriesTrending, NftTypesValues, RootCreatorContext, RootUserContext, SaleHistory } from '../contexts';
import { NftsAPI } from '../APIs/NftsAPI';
import { Link, useNavigate } from 'react-router-dom';
import CardNFT from '../components/CardNFT';
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';


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


export interface NftsInterface {
    title: string,
    id: number,
    description: string,
    owner: number,
    image: string,
    price: string | number,
    created_at: string,
    sales_history: SaleHistory[],
    categories_trending: number[],
}

export interface PaginatedData {
    results: NftsInterface[],
    count: number,
    next: string,
    previous: string,
}


const ContainerPrincipal = () => {
    const userContext = React.useContext(RootUserContext)
    const creatorContext = React.useContext(RootCreatorContext)
    const [nftsData, setnftsData] = React.useState<PaginatedData>({} as PaginatedData)
    const [castedCount, setCastedCount] = React.useState<number[]>([])
    const [categoriesTrending, setCategoriesTrending] = React.useState<CategoriesTrending[]>([])
    const [activeCategoriesTrending, setActiveCategoriesTrending] = React.useState<number>(0)
    const [activePage, setActivePage] = React.useState(1)

    const history = useNavigate()

    const callingTheNestedData = (index: number) => {
        if (activeCategoriesTrending) {
            let resNFTs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(index)
            resNFTs.get_all_nfts_paginate_by_categories(activeCategoriesTrending, index).then(data => setnftsData(data))
        } else {
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
            respFaqs.get_all_nfts_paginate_by_categories(activeCategoriesTrending, it).then(data => setnftsData(data))

        } else {

            let respFaqs = new NftsAPI()
            window.scrollTo(0, 200)
            setActivePage(it)
            respFaqs.get_all_nfts(it).then(data => setnftsData(data))
        }

    }

    const fetching_nfts = () => {
        let resNFTs = new NftsAPI()
        resNFTs.get_all_nfts().then(data => setnftsData(data))
    }

    React.useEffect(() => {
        fetching_nfts()
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
            fetching_nfts()
    }, [activeCategoriesTrending])


    React.useEffect(() => {
        activeCategorieFilteringCallbacks()
    }, [activeCategorieFilteringCallbacks])


    React.useEffect(() => {
        if (nftsData.count) {
            let calculatedNumbersPage = parseInt(((nftsData.count) / 10).toFixed(0))
            let check_Can_add_Or_Not = (calculatedNumbersPage * 10) >= nftsData.count
            // console.log(check_Can_add_Or_Not)
            // console.log(nftsData.count)

            if (check_Can_add_Or_Not) {
                setCastedCount(Array.from(Array(calculatedNumbersPage).keys()).map(i => i + 1))
            } else {
                setCastedCount(Array.from(Array((calculatedNumbersPage + 1)).keys()).map(i => i + 1))
            }

            // setCastedCount(Array.from(Array().keys()).map(i => i + 1))
        }
    }, [nftsData.count])

    return (
        // <div style={{ position: "relative" }}>


        <motion.div
            className='relative'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                {/* <img src={ImContainer} className="object-cover" alt="Imgs" /> */}
                <div className="container-img-content">
                    <p className="text-[3rem] text-slate-50 font-MontBold leading-[3.5rem] text-center w-full">Page Products
                        <span className="block animated_gradient_bg textS">NFTs marketplace</span></p>
                    <div className="mx-auto">
                        {/* <Link to={"/createNFt"}> */}
                        <button
                            onClick={() => {
                                !userContext?.user?.is_staff && creatorContext?.setisCreator(true)
                                userContext?.user?.is_staff && history("/createNFt")

                                // creatorContext?.setisCreator(true)
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
                        {/* </Link> */}
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="mb-3">
                    <h2 className="text-[1.8rem] font-MontBold text-white">Trending Auctions</h2>
                    <div className="flex mt-2 gap-4 row align-center">
                        <div className="flex mt-2 gap-4 row">
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
                        <button className="p-[1rem] rounded-md 
                                            shadow-sm text-slate-200 bg-slate-800 font-MontSemiBold py-[.5rem]
                                             hover:bg-indigo-500 flex justify-evenly gap-2 items-center text-sm">
                            <IoFilter
                                color="white"
                                size={15}
                            /> On sale</button>
                    </div>
                </div>
                <div className="flex gap-5 mt-10 align-center pb-10 flex-wrap">
                    {
                        nftsData.results && <>
                            {
                                nftsData.results.map(item => {
                                    let sendedData: NftTypesValues = {
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
                                                link={true}
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
                        ((!nftsData.results)) && <div className="text-center w-full">
                            <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée NFTs n'est à afficher pour le moment.</h1>
                        </div>
                    }


                    {/* <NFTItem image={NFT6} creator={User2} />
                    <NFTItem image={NFT7} creator={User3} />
                    <NFTItem image={NFT8} creator={User4} />
                    <NFTItem image={NFT9} creator={User5} />
                    <NFTItem image={NFT} creator={User6} />
                    <NFTItem image={NFT2} creator={User7} />
                    <NFTItem image={NFT3} creator={User8} />
                    <NFTItem image={NFT4} creator={User9} />
                    <NFTItem image={NFT10} creator={User10} /> */}
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