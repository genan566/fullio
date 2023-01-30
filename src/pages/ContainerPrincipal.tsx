import React from 'react'

import { IoFilter, IoSearch, IoPerson, IoPawSharp } from "react-icons/io5";
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
import { RiNotificationBadgeFill } from "react-icons/ri";


import { motion } from "framer-motion"
import { CategoriesTrending, NftTypesValues, Owner, RootNftContext, SaleHistory } from '../contexts';
import { NftsAPI } from '../APIs/NftsAPI';


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
    owner: Owner,
    image: string,
    price: string | number,
    created_at: string,
    sales_history: SaleHistory[],
    categories_trending: CategoriesTrending[],
}


const ContainerPrincipal = () => {
    const [nftsData, setnftsData] = React.useState<NftsInterface[]>([])


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

    return (
        // <div style={{ position: "relative" }}>


        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                {/* <img src={ImContainer} className="object-cover" alt="Imgs" /> */}
                <div className="container-img-content">
                    <p className="text-4xl text-slate-50 font-MontBold">Page Products <span className="block mt-2">NFTs marketplace</span></p>
                    <div className="flex gap-4 mt-2">
                        <button className="bg-violet-500
                            hover:bg-violet-600
                            active:bg-violet-700 
                            focus:outline-none  shadow-md
                            focus:ring-2 text-md
                            focus:ring-violet-300
                                py-2 text-white px-5
                                rounded-2xl mt-5">
                            Create your own one
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="mb-3">
                    <h2 className="text-xl font-MontSemiBold text-white">Trending Auctions</h2>
                    <div className="flex mt-2 gap-4 row align-center">
                        <div className="flex mt-2 gap-4 row">
                            <button className="customButtonFilterD">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                            <button className="customButtonFilterTransparent">On sale</button>
                        </div>
                        <button className="customButtonFilterD">
                            <IoFilter
                                color="white"
                                size={15}
                            /> On sale</button>
                    </div>
                </div>
                <div className="flex gap-5 mt-10 align-center pb-10 flex-wrap">
                    {
                        nftsData.map(item => {
                            let sendedData: NftTypesValues = {
                                title: item.title,
                                owner_pic: item.owner.image,
                                description: item.description,
                                owner_name: item.owner.email,
                                image: item.image,
                                price: item.price,
                                categories_trending: item.categories_trending,
                                sales_history: item.sales_history,
                            }
                            return (
                                <>
                                    <NFTItem
                                        data={sendedData}
                                        rebirth={item.title}
                                        key={item.id}
                                        image={item.image}
                                        categories_trending={item.categories_trending}
                                        sales_history={item.sales_history}
                                        creator={item.owner.image} />
                                </>
                            )
                        })
                    }

                    {
                        nftsData.length === 0 && <div className="text-center w-full">
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
            </div>
        </motion.div>
        // </div>
    )
}

export default ContainerPrincipal