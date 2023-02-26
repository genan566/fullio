import React from 'react'
import { IoArrowBack, IoCheckmark, IoFileTray, IoSend, IoTrash, } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { RootNftContext, RootUserContext, RootUserTokenContext, } from '../contexts'

import NFT10 from "../imgs/10.png";
import ISOTOP from "../imgs/pexels-pixabay.jpg";

import { RiCloseCircleLine, RiShoppingBasket2Line } from 'react-icons/ri';
import { AiTwotoneFire } from 'react-icons/ai';
import { AuthAPI } from '../APIs/AuthApi';
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI';
import { UserRetrieveInterface } from '../types/UserRetrieveTypes';
import { CategoriesTrending } from '../types/CategorieTrendingType';
import { SaleHistory } from '../types/SaleHistoryType';

import { RootState } from '../redux/store';

import { useAppDispatch, useAppSelector } from '../hooks/modalsHooks';
import { TOGGLE_MODAL_SUSCRIPTION } from '../redux/constants/ModalsConstants';
import { MdEdit } from 'react-icons/md';
import { NftsAPI } from '../APIs/NftsAPI';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorText from '../components/ErrorText';
import { NftTypesValues } from '../types/NFTTypes';
import { FileInterface } from '../types/FileInterface';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { notify } from '../utilities/Toaster';

type Inputs = {
    title: string,
    description: string,
    // price: string,
};


const DetailNft = () => {
    const nftContext = React.useContext(RootNftContext)
    const userContext = React.useContext(RootUserContext)

    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)
    const [userRetrieveDataListForSales, setuserRetrieveDataListForSales] = React.useState<UserRetrieveInterface[]>([])
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])
    const [categorie, setCategorie] = React.useState<CategoriesTrending | null>(null)
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const [editable, setEditable] = React.useState(false)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const [file, setFile] = React.useState<FileInterface>({} as FileInterface);





    const { register, handleSubmit
        , formState: { errors } } = useForm<Inputs>();

    const location = useLocation();
    const { showModalSuscription } = useAppSelector((state: RootState) => state.modalsReducer)

    const dispatch = useAppDispatch();

    const delete_nft = () => {
        let resNFTs = new NftsAPI()
        resNFTs
            .delete_nft(userTokenContext.token, nftContext?.nftData?.id)
            .then(data => {
                window.history.back()
                notify("Suppression réussie")
                // setnftsData(data)
            })
    }

    const handlerForUpdate = (gettedData: Inputs) => {
        let token = userTokenContext.token
        let nft_update = new NftsAPI()

        nft_update
            .retrive_nft_update(userTokenContext.token, nftContext?.nftData?.id, gettedData)
            .then((res) => {
                // console.log("New Data", res)
                let sendedData: NftTypesValues = {
                    id: res.id,
                    title: res.title,
                    description: res.description,
                    owner_id: res.owner,
                    image: res.image,
                    price: res.price,
                    categories_trending: res.categories_trending,
                    sales_history: res.sales_history,
                }
                nftContext?.setNftData(sendedData)
                setEditable(!editable)

                notify("Edition réussie")
            })
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        handlerForUpdate(data)
    };

    const load_sale_histories = async () => {
        let sales_getted = nftContext?.nftData?.id
        if (Boolean(sales_getted)) {
            let salesHistories_trendings = new SaleHistoriesAPI()
            salesHistories_trendings
                .get_multi_sales_by_nftID(sales_getted)
                .then(data => {
                    if (data.length > 0) {
                        setSaleHistories([...data])
                        data.map((item: any) => {
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

                                        setuserRetrieveDataListForSales
                                            ([...userRetrieveDataListForSales, formatedData])

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

    const upload_image_to_nft = () => {
        if (file.file) {
            let nftApi = new NftsAPI()
            nftApi.upload_image_to_nft(nftContext?.nftData?.id, { image: file.file, }, userTokenContext.token)
                .then((re) => {
                    setFile({} as any)
                    nftApi.get_unique(nftContext?.nftData?.id).then((data) => {
                        nftContext?.setNftData(data)
                        notify("Edition réussie")
                    })
                })
        }
    }

    function handleChange(e: any) {
        console.log(e.target.files[0]);
        setFile({
            asPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
        });
    }

    const load_nft_owner = () => {
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
    }


    React.useEffect(() => {

        if (categorie !== null) {
            let checker = categories.filter(it => it.id === categorie.id)
            if (checker.length === 0) {
                setCategories([...categories, categorie])
            }
        }
    }, [categorie])

    React.useEffect(() => {
        load_nft_owner()
    }, [nftContext?.nftData?.owner_id])

    React.useEffect(() => {
        load_sale_histories()
    }, [nftContext?.nftData?.sales_history, showModalSuscription])

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
            {
                nftContext?.nftData?.id && ((userContext.user.is_superuser) ||
                    (userContext.user.name === userRetrieveData.name)) && <div className="w-full mt-[5rem]">
                    <button
                        onClick={delete_nft}
                        className="bg-red-600 flex row items-center justify-center gap-1 w-fit 
                        hover:bg-transparent hover: border hover: border-red-600 hover:text-white
                        focus:outline-none
                        text-sm font-MontSemiBold
                        focus:ring-2 mx-auto
                        focus:ring-gray-500
                            py-1 text-white px-[1rem]
                            rounded-lg">
                        <IoTrash
                            // color="white"
                            size={17}
                        /> <p>Supprimer le produit NFT</p>
                    </button>
                </div>
            }
            <div className="flex gap-2 mt-[5rem] max-[700px]:flex-wrap justify-center items-center">
                <figure className="w-[35vw]  max-[700px]:max-w-[100%] max-[700px]:w-[100%]
                 max-w-[700px] min-h-[500px] max-h-[550px] relative overflow-hidden
                rounded-lg min-w-[280px] bg-zinc-700 shadow-md flex items-center justify-center">
                    <img
                        className="h-full w-full absolute inset-0 z-[1] object-cover "
                        src={file.asPreview || nftContext?.nftData?.image || NFT10}
                        alt="user Profile" />

                    {
                        !file.asPreview &&
                        nftContext?.nftData?.id
                        && ((userContext.user.is_superuser) || (userContext.user.name === userRetrieveData.name)) && (
                            <button className="absolute top-5 active:bg-slate-700 right-5 z-[2]
                                rounded-full border border-1 border-transparent p-3 bg-slate-900 shadow-lg">
                                <IoFileTray
                                    // color="white"
                                    size={17}
                                />
                                <input type="file"
                                    onChange={handleChange}
                                    // {...register("title", { required: true })}
                                    className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" />
                            </button>
                        )
                    }

                    {
                        file.asPreview && (
                            <button
                                onClick={() => setFile({} as any)}
                                className="absolute top-5 active:bg-red-700 right-5 z-[2]
                                rounded-full border border-1 border-transparent p-3 bg-red-900 shadow-lg">
                                <IoTrash
                                    // color="white"
                                    size={17}
                                />
                                {/* <input type="file" onChange={() => setFile("")} className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" /> */}
                            </button>
                        )
                    }

                    {
                        file.asPreview && (
                            <button
                                onClick={upload_image_to_nft}
                                className="absolute top-5 hover:bg-violet-700 left-5 z-[2] flex gap-[.5rem] 
                                items-center justify-center py-[.2rem] px-[1rem] text-sm font-MontSemiBold
                                rounded-md border border-1 border-transparent bg-transparent border-1 border-violet-500 shadow-lg">
                                <MdEdit
                                    // color="white"
                                    size={17}
                                />
                                Update
                                {/* <input type="file" onChange={() => setFile("")} className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" /> */}
                            </button>
                        )
                    }
                </figure>

                <div className="w-full max-w-[650px]">
                    <div className="p-[2rem] bg-slate-800 rounded-lg shadow-md w-full max-[700px]:max-w-[100%] max-w-[650px] relative">
                        {
                            nftContext?.nftData?.id && (((userContext.user.is_superuser) || (userContext.user.name === userRetrieveData.name)) && (!editable)) && (
                                <button
                                    onClick={() => setEditable(!editable)}
                                    className="absolute top-5 active:bg-slate-700 right-5 z-[2]
                                rounded-full border border-1 border-transparent p-2 bg-slate-900 shadow-lg">
                                    <MdEdit
                                        // color="white"
                                        size={17}
                                    />
                                </button>
                            )
                        }
                        {
                            nftContext?.nftData?.id && editable && (
                                <>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mt-[2rem]">
                                            <div className='w-full'>
                                                <p className="text-xs font-MontBold text-white mb-4">Edit your nft title</p>

                                                <div className="control-container-S mt-3 mb-1" id='cPar'>
                                                    {/* <IoPerson
                                                color="white"
                                                size={18}
                                            /> */}
                                                    <input
                                                        placeholder='title NFT'
                                                        type="text"
                                                        defaultValue={nftContext?.nftData?.title}
                                                        className="control-input-S"
                                                        {...register("title", { required: true })}
                                                    />
                                                </div>
                                                {errors.title && <ErrorText />}
                                            </div>

                                            <div className='w-full mt-[1rem]'>
                                                <p className="text-xs font-MontBold text-white mb-4">Enter the description for your NFT</p>

                                                <div className="control-container-S mt-3 mb-1" id='cPar'>

                                                    <textarea
                                                        placeholder='Description'
                                                        rows={4}
                                                        {...register("description", { required: true })}
                                                        className="control-input-S p-2"
                                                        style={{ borderRadius: "5px" }}
                                                        defaultValue={nftContext?.nftData?.description} />
                                                </div>
                                                {errors.description && <ErrorText />}

                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-[1rem] flex-wrap mt-[1rem]">
                                            <button
                                                type='submit'
                                                disabled={!Boolean(userContext.user.id)}

                                                className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                                                    hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                                    focus:outline-none
                                                    text-sm font-MontSemiBold
                                                    focus:ring-2
                                                    focus:ring-gray-500
                                                        py-1 text-white px-[1rem]
                                                        rounded-lg">
                                                <IoCheckmark

                                                    size={17}
                                                /> <p>Valider</p>
                                            </button>

                                            <button
                                                disabled={!Boolean(userContext.user.id)}
                                                onClick={() => setEditable(!editable)}
                                                className="bg-red-600 flex row items-center justify-center gap-1 w-fit 
                                                hover:bg-transparent hover: border hover: border-red-600 hover:text-white
                                                focus:outline-none
                                                text-sm font-MontSemiBold
                                                focus:ring-2
                                                focus:ring-gray-500
                                                    py-1 text-white px-[1rem]
                                                    rounded-lg">
                                                <RiCloseCircleLine

                                                    size={17}
                                                /> <p>Annuler</p>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )
                        }

                        {
                            nftContext?.nftData?.id && !editable && (
                                <>
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
                                </>
                            )
                        }

                        <div className='mt-5 bottom-divider py-4 mb-5'>
                            <p className="text-xs text-slate-400 font-MontSemiBold">Owned by</p>
                            <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                <img
                                    className="h-12 w-12 rounded-full object-cover shadow-lg"
                                    src={userRetrieveData.image || ISOTOP}
                                    alt="user Profile" />
                                <p className="text-xs text-white font-MontBold">{userRetrieveData.name || "Non défini"}</p>
                            </div>
                        </div>
                        <div className="">
                            <p className="text-xs text-slate-400 font-MontSemiBold mb-1">Current Price</p>
                            <h1 className="text-xl text-white font-MontSemiBold">ETH {nftContext?.nftData?.price || 0.00}</h1>
                        </div>



                        <div className="flex gap-5 justify-start items-center w-full mt-6">
                            {
                                nftContext?.nftData?.id && Boolean(userContext.user.id) && <button
                                    disabled={!Boolean(userContext.user.id)}
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
                            }

                            {
                                !Boolean(userContext.user.id) && <p className="text-sm text-red-400">Please login to subscribe</p>
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
                                        <div className="flex row justify-center items-center max-w-[200px] flex-grow">
                                            <div className="flex gap-2 row items-center justify-start w-fit" >
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                    src={retrievingUser?.image || ISOTOP}
                                                    alt="user Profile" />
                                                <p className="text-sm text-white font-MontSemiBold max-w-[120px] truncate">{item.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-white text-sm font-MontSemiBold flex-grow">{retrievingUser?.email || "Anonyme"}</p>
                                        <p className="text-orange-500 text-sm font-MontSemiBold flex-grow">{item?.price}ETH</p>
                                        <p className="text-white text-sm font-MontSemiBold flex-grow">{item.created_at}</p>
                                        <p className="text-white text-sm font-MontSemiBold flex-grow">{item.will_end_at}</p>
                                        {/* <button
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
                                        </button> */}
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