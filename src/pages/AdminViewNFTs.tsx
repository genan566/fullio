import React from 'react'

import Accordion from '../components/Accordion'
import "../styles/FAQ.scss"

import { RootCreatorContext, RootUserContext, RootUserTokenContext } from '../contexts'
import { FaqsAPI } from '../APIs/FaqsAPI'

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from '../hooks/modalsHooks'
import { RootState } from '../redux/store'
import { TOGGLE_MODAL_ADDING_FAQS, TOGGLE_MODAL_FOR_CATEGORIES, TOGGLE_MODAL_FOR_LOGIN } from '../redux/constants/ModalsConstants'
import { useToast } from '@chakra-ui/react'

import { UserTypesValues } from '../types/UserTypeValues'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack, IoArrowForward, IoSearch, IoTrash } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { CategoriesTrending } from '../types/CategorieTrendingType'
import { NftsAPI } from '../APIs/NftsAPI'
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending'
import { SubmitHandler, useForm } from 'react-hook-form'
import RenderingNFTs from '../components/RenderingNFTs'
import { RiAddFill, RiShoppingBasket2Line } from 'react-icons/ri'
import { PaginatedDataNFT } from '../types/PaginatedData'
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

type Inputs = {
    search: string,
};
const AdminViewNFTs = () => {

    const [dataUsers, setDataUsers] = React.useState<UserTypesValues[]>([])
    const creatorContext = React.useContext(RootCreatorContext)

    const userContext = React.useContext(RootUserContext)
    const userToken = React.useContext(RootUserTokenContext)
    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)
    const [castedCount, setCastedCount] = React.useState<number[]>([])
    const [categoriesTrending, setCategoriesTrending] = React.useState<CategoriesTrending[]>([])
    const [activeCategoriesTrending, setActiveCategoriesTrending] = React.useState<number>(0)
    const [activePage, setActivePage] = React.useState(1)
    const [search, setSearch] = React.useState("")
    const dispatch = useAppDispatch();
    // const { stateFAQs } = useAppSelector((state: RootState) => state.faqsReducer)

    const { showModalForCategories } = useAppSelector((state: RootState) => state.modalsReducer)
    const toast = useToast()

    const history = useNavigate()

    const check_user_can_create = React.useCallback(() => {
        ((!Boolean(userContext.user.id)) || (Boolean(userContext?.user?.is_superuser === false))) && history("/")
    }, [userContext?.user])


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();


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
        check_user_can_create()
    }, [check_user_can_create])



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
    }, [])

    React.useEffect(() => {
        let categories_trendings = new CategoriesTrendingAPI()
        categories_trendings.get_all_categories().then(data => {
            setCategoriesTrending(data.results)
        })
    }, [showModalForCategories])

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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='px-[1rem]'>

            <div className="">
                <button

                    onClick={() => window.history.back()}

                    className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                        hover:bg-white hover:text-black

                        focus:outline-none
                        text-xs font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                        py-1 text-white px-3
                            rounded-lg">
                    <IoArrowBack

                        size={17}
                    /> <p>Go Back</p>
                </button>
            </div>
            <h1 className="text-4xl font-MontBold my-5 mt-[3rem]">
                Products
            </h1>

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
                    /> <p>Create product </p>
                </button>

            </div>

            <div className="mb-3 mt-[2rem]">
                <div className="flex mt-2 gap-4 row max-[900px]:flex-wrap align-center">
                    <div className="flex mt-2 gap-4 max-[900px]:gap-[1rem] flex-wrap row">

                        {
                            userContext.user.is_superuser && <button
                                // onClick={() => {
                                //     setActiveCategoriesTrending(0);
                                // }}

                                onClick={() => dispatch({ type: TOGGLE_MODAL_FOR_CATEGORIES, payload: true })}
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

            <div className="flex gap-5 mt-10 align-center pb-10 max-[899px]:overflow-x-scroll min-[900px]:flex-wrap max-[899px]:max-w-[95vw] max-[500px]:max-w-[90vw]">
                <RenderingNFTs
                    custom_func={initial_fetching_nfts}
                    render_type='flated'
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
        </motion.div>
    )
}

export default AdminViewNFTs