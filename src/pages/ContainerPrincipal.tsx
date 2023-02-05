import React from 'react'

import { IoFilter, IoSearch, IoPerson, IoPawSharp, IoArrowBack, IoArrowForward } from "react-icons/io5";
import NFT from "../imgs/nftsImgs/unnamed5.jpg";
import NFT2 from "../imgs/nftsImgs/unnamed.jpg";
import NFT3 from "../imgs/nftsImgs/unnamed3.jpg";
import NFT4 from "../imgs/nftsImgs/unnamed4.jpg";
import NFT5 from "../imgs/1.png";
import NFT6 from "../imgs/2.png";
import NFT7 from "../imgs/4.png";
import NFT8 from "../imgs/5.png";
import NFT9 from "../imgs/6.png";
import NFT10 from "../imgs/10.png";
import NFT11 from "../imgs/istockphoto.jpg";
import NFT12 from "../imgs/istockphoto-1367699775-612x612.jpg";
import NFT13 from "../imgs/111.jpeg";
import NFT14 from "../imgs/222.jpeg";
import NFT15 from "../imgs/333.jpeg";
import NFT16 from "../imgs/444.jpeg";
import NFT17 from "../imgs/555.jpg";
import NFT18 from "../imgs/666.jpeg";
import NFT19 from "../imgs/777.jpeg";

import User1 from "../imgs/users/image1.png";
import User2 from "../imgs/users/image2.png";
import User3 from "../imgs/users/image3.png";
import User4 from "../imgs/users/image4.png";
import User5 from "../imgs/users/image5.png";
import User6 from "../imgs/users/image6.png";
import User7 from "../imgs/users/image7.png";
import User8 from "../imgs/users/image8.png";
import User9 from "../imgs/users/image9.png";
import User10 from "../imgs/users/image10.png";

import NFTItem from '../components/NFTItem';
import { RiNotificationBadgeFill, RiShoppingBasket2Line } from "react-icons/ri";


import { motion } from "framer-motion"
import { CategoriesTrending, NftTypesValues, Owner, RootCreatorContext, RootNftContext, RootUserContext, SaleHistory } from '../contexts';
import { NftsAPI } from '../APIs/NftsAPI';
import { Link, useNavigate } from 'react-router-dom';
import CardNFT from '../components/CardNFT';
import ModalsOnSearch from '../components/modals/ModalsOnSearch';
import ModalForUserNotStaff from '../components/modals/ModalForUserNotStaff';


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


interface NftsInterface {
    title: string,
    id: number,
    description: string,
    owner: number,
    image: string,
    price: string | number,
    created_at: string,
    sales_history: SaleHistory[],
    categories_trending: CategoriesTrending[],
}

interface PaginatedData {
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
    const [activePage, setActivePage] = React.useState(1)
    const [requestToStaff, setRequestToStaff] = React.useState(false)

    const history = useNavigate()


    const callingTheNestedData = (index: number) => {
        let respFaqs = new NftsAPI()
        // window.scrollY = 1000
        window.scrollTo(0, 200)
        setActivePage(index)
        respFaqs.get_all_nfts(index).then(data => setnftsData(data))
    }


    const data = [
        {
            id: 17,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT17,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User10
        },
        {
            id: 11,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT11,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User10
        },
        {
            id: 12,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT12,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User9
        },
        {
            id: 10,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User10
        },
        {
            id: 9,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT10,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User9
        },
        {
            id: 1,
            image: NFT2,
            title: "Golden Secret Santa Nutcracker Grokko - Holiday Edition",
            owner: "Comlan",
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User1
        },
        {
            id: 18,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT18,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User8
        },
        {
            id: 19,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT19,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User9
        },
        {
            id: 2,
            image: NFT3,
            title: "On Chain Gaming Flish",
            owner: "David Dossier",
            creator: User2,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
        {
            id: 3,
            image: NFT4,
            title: "Bronze Secret NFT",
            owner: "Hubert Doc",
            creator: User3,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
        {
            id: 4,
            image: NFT5,
            title: "Dawnlight Badge - Gold",
            owner: "COssi Jack",
            creator: User4,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
        {
            id: 16,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT16,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User4
        },
        {
            id: 15,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT15,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User8
        },
        {
            id: 14,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT14,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User10
        },
        {
            id: 13,
            title: "Dawnlight Badge - Bronze",
            owner: "Jean",
            image: NFT13,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",
            creator: User10
        },
        {
            id: 5,
            image: NFT6,
            title: "Dawnlight Badge - Silver",
            owner: "Imran",
            creator: User5,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
        {
            id: 6,
            image: NFT7,
            title: "EmberLynx Clix",
            owner: "Jean-POISSIER",
            creator: User6,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
        {
            id: 7,
            image: NFT8,
            title: "Dawnlight Badge - Gold",
            owner: "Darling-Diert",
            creator: User7,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
        {
            id: 8,
            image: NFT9,
            title: "Secret Santa Nutcracker Grokko - Holiday Edition",
            owner: "Baptiste",
            creator: User8,
            price: 25.00,
            description: "Atlas is too cute to go to the movies alone. This nonplayable 1 of 1 NFT is a part of Illuvium's Gameplay Reveal Trailer Giveaway.",

        },
    ]

    React.useEffect(() => {
        let respFaqs = new NftsAPI()
        // let token = userTokenContext.token
        respFaqs.get_all_nfts().then(data => setnftsData(data))
    }, [])


    React.useEffect(() => {
        console.log(nftsData)
    }, [nftsData])


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
                                    onClick={() => {
                                        let respFaqs = new NftsAPI()
                                        window.scrollTo(0, 200)
                                        setActivePage(it)
                                        respFaqs.get_all_nfts(it).then(data => setnftsData(data))
                                    }}
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