import React from 'react'
import { IoArrowBack, IoFileTray, IoTrash } from 'react-icons/io5'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion"

import { RootUserContext, RootUserTokenContext } from '../contexts';
import { NftsAPI } from '../APIs/NftsAPI';
import { FileInterface } from '../types/FileInterface';

import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending';
import { CategoriesTrending } from '../types/CategorieTrendingType';
import ErrorText from '../components/ErrorText';

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
    title: string,
    price: string,
    description: string,
    image: File
};


const CreateNFt = () => {
    const userContext = React.useContext(RootUserContext)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const [file, setFile] = React.useState<FileInterface>({} as FileInterface);
    const [id, setId] = React.useState(0);
    const [selectedCategorie, setSelectedCategorie] = React.useState<number>();
    const [categoriesTrending, setCategoriesTrending] = React.useState<CategoriesTrending[]>([])

    function handleChange(e: any) {
        console.log(e.target.files[0]);
        setFile({
            asPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
        });
    }

    const history = useNavigate()

    const check_user_can_create = React.useCallback(() => {
        userContext?.user?.is_staff === false && history("/")
    }, [userContext?.user])

    React.useEffect(() => {
        check_user_can_create()
    }, [check_user_can_create])

    React.useEffect(() => {
        Boolean(categoriesTrending.length) && setSelectedCategorie(categoriesTrending[0].id)
    }, [categoriesTrending])

    React.useEffect(() => {
        let categories_trendings = new CategoriesTrendingAPI()
        categories_trendings.get_all_categories().then(data => {
            setCategoriesTrending(data.results)
        })
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {

        if (file.file && userContext?.user?.id && (id !== 0)) {
            let respFaqs = new NftsAPI()
            respFaqs.create_nfts(
                {
                    title: data.title,
                    owner: id,
                    categories_trending: [selectedCategorie],
                    price: data.price,
                    description: data.description,
                }
                , userTokenContext.token)
                .then(data => {
                    if (data.id) {
                        respFaqs.upload_image_to_nft(data.id, { image: file.file, }, userTokenContext.token)
                            .then((re) => history("/manageNFTs"))
                    }
                })
        }
    };

    React.useEffect(() => {
        if (userContext?.user?.id) setId(userContext?.user?.id)
    }, [userContext])

    const CustomSelects = ({ categoriesTrending }: { categoriesTrending: CategoriesTrending[] }) => {
        return (
            <select
                // onChange={(e) => console.log(e.target)}
                onChange={(e) => setSelectedCategorie(parseInt(e.target.value))}
                name=""
                id=""
                className='px-2 mt-5 border border-white rounded-lg shadow-md'>
                {
                    categoriesTrending.map(person => {
                        return <option value={person.id}
                        // disabled={userContext.user.is_superuser}
                        >{person.name}</option>
                    })
                }
            </select>
        )
    }


    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='relative'>

            <div className="mb-[2rem]">
                <button

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

            <div className="pr-[1rem]">
                <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                    <div className="container-img-content">
                        <p className="text-[2.5rem] max-[450px]:text-[1.5rem] text-slate-50 font-MontBold leading-[3.5rem] max-[450px]:leading-[2rem] text-center w-full">Create Your Own
                            <span className="block animated_gradient_bg textS">NFT</span></p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-[5rem] pr-[1rem] justify-center max-[1050px]:flex-wrap">

                <figure className="w-[30vw] max-[1050px]:w-full min-h-[500px] max-h-[550px] relative overflow-hidden
                            rounded-lg min-w-[280px] bg-zinc-800 shadow-md flex items-center justify-center">
                    {
                        !file.asPreview && <h2 className="text-white text-[1.5rem] font-MontSemiBold">
                            Please uplaod image
                        </h2>
                    }
                    {
                        !file.asPreview && (
                            <button className="absolute top-5 active:bg-slate-700 right-5 z-[2]
                                rounded-full border border-1 border-transparent p-4 bg-slate-900 shadow-lg">
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
                                rounded-full border border-1 border-transparent p-4 bg-red-900 shadow-lg">
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

                            <img
                                className="h-full w-full absolute inset-0 z-[1] object-cover "
                                src={file.asPreview}
                                alt="user Profile" />
                        )
                    }
                </figure>

                <div className="p-[2rem] bg-slate-800 rounded-lg shadow-md">
                    <div className="px-[1.5vw] max-w-[900px] mx-auto flex flex-row justify-center gap-[1rem] items-center max-[800px]:flex-wrap">
                        <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                        after:absolute after:top-0 after:left-0 after:bg-indigo-500 relative text-[1.6rem] leading-[2.5rem] py-4 w-[50%] max-[800px]:w-full">
                            Create your NFT by entering these informations
                        </h2>

                        <p className='text-white text-[1rem] w-[50%] max-[800px]:w-full'>Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Nobis error neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                            libero fugiat! Itaque.</p>
                    </div>

                    <form action="" className='' onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-[1.5vw] w-full mx-auto">


                            <div className=" mt-[1rem] flex justify-center items-stretch gap-[1rem] max-[600px]:flex-wrap">
                                <div className='w-full'>
                                    <p className="text-xs font-MontBold text-white mb-4">Enter a title for your Nfts</p>

                                    <div className="control-container-S mt-3 mb-1" id='cPar'>
                                        {/* <IoPerson
                                                color="white"
                                                size={18}
                                            /> */}
                                        <input
                                            placeholder='title NFT'
                                            type="text"
                                            className="control-input-S" {...register("title", { required: true })} />
                                    </div>
                                    {errors.title && <ErrorText />}
                                </div>

                                <div className='w-full'>
                                    <p className="text-xs font-MontBold text-white mb-4">Enter any price to your NFT</p>

                                    <div className="control-container-S mt-3 mb-1" id='cPar'>
                                        {/* <IoPerson
                                            color="white"
                                            size={18}
                                        /> */}
                                        <input
                                            placeholder='Price ex: 50.00'
                                            type="number"
                                            className="control-input-S" {...register("price", { required: true })} />
                                    </div>
                                    {errors.price && <ErrorText />}
                                </div>
                            </div>

                            <div className='w-full mt-[1rem]'>
                                <p className="text-xs font-MontBold text-white mb-4">Enter any description for your NFT</p>

                                <div className="control-container-S sB mt-3 mb-1" id='cPar'>
                                    <textarea
                                        placeholder='Description'
                                        rows={8}
                                        className="control-input-S" {...register("description", { required: true })} />
                                </div>
                                {errors.description && <ErrorText />}
                            </div>

                            {/* <AnimatedMulti /> */}
                            <div className="w-full mt-[2rem]">
                                <p className="text-xs font-MontBold text-white mb-1">Select any categorie to your NFT</p>
                                <CustomSelects
                                    categoriesTrending={categoriesTrending} />
                            </div>
                        </div>

                        <button
                            type='submit'
                            className="bg-violet-600 flex row items-center justify-center gap-1 w-fit  mx-auto mt-[2rem]
                                hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                focus:outline-none
                                text-sm font-MontSemiBold
                                focus:ring-2
                                focus:ring-gray-500
                                    py-1 text-white px-[2rem]
                                    rounded-lg">
                            <p className='mr-[.5rem]'>Send for create</p>
                            <RiShoppingBasket2Line
                                // color="white"
                                size={17}
                            />
                        </button>
                    </form>
                </div>
            </div>
        </motion.div >
    )
}

export default CreateNFt