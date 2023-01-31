import React from 'react'
import { IoArrowBack, IoArrowForward, IoFileTray, IoFilter, IoRemove, IoSend, IoTrash } from 'react-icons/io5'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import CardNFT1 from '../components/CardNFT1'

import { motion } from "framer-motion"

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
const CreateNFt = () => {
    const [file, setFile] = React.useState<string | undefined>(undefined);
    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    React.useEffect(() => {
        console.log("FileSSSSSSSSSSSSSSSS", file)
    }, [file])
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='relative'>

            <div className="mb-[2rem]">
                <Link
                    to={"/manageNFTs"}
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
                </Link>
            </div>

            <div className="container-img rounded-xl drop-shadow-md bg-cover w-full">
                <div className="container-img-content">
                    <p className="text-[2.7rem] text-slate-50 font-MontBold leading-[3.5rem] text-center w-full">Create Your Own
                        <span className="block animated_gradient_bg textS">NFT</span></p>
                </div>
            </div>


            {/* <p className="text-[1.5rem] text-slate-50 font-MontBold text-center w-full mt-[2rem]">Creation Form
                </p> */}
            <div className="flex gap-2 mt-[5rem] justify-center flex-wrap">
                <figure className="w-[30vw] max-w-[700px] min-h-[500px] max-h-[550px] relative overflow-hidden
                rounded-lg min-w-[280px] bg-zinc-800 shadow-md flex items-center justify-center">
                    {
                        !file && <h2 className="text-white text-[1.5rem] font-MontSemiBold">
                            Please uplaod image
                        </h2>
                    }
                    {
                        !file && (
                            <button className="absolute top-5 active:bg-slate-700 right-5 z-[2]
                                rounded-full border border-1 border-transparent p-4 bg-slate-900 shadow-lg">
                                <IoFileTray
                                    // color="white"
                                    size={17}
                                />
                                <input type="file" onChange={handleChange} className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" />
                            </button>
                        )
                    }
                    {
                        file && (
                            <button
                                onClick={() => setFile("")}
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
                        file && (

                            <img
                                className="h-full w-full absolute inset-0 z-[1] object-cover "
                                src={file}
                                alt="user Profile" />
                        )
                    }
                </figure>

                <div className="p-[2rem] bg-slate-800 rounded-lg shadow-md">
                    <div className="px-[1.5vw] max-w-[600px] mx-auto flex flex-row justify-center gap-[1rem] items-center flex-wrap">
                        <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                after:absolute after:top-0 after:left-0 after:bg-white relative text-[1.7rem] leading-[2.5rem] py-4 w-[50%]">
                            Create your NFT by entering these informations
                        </h2>

                        <p className='text-white text-sm flex-grow w-[30%]'>Lorem ipsum dolor sit amet consectetur neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                            libero fugiat! Itaque.</p>
                    </div>
                    <div className="px-[1.5vw] max-w-[600px] mx-auto">

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
                                        className="control-input-S" />
                                </div>
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
                                        className="control-input-S" />
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-[1rem]'>
                            <p className="text-xs font-MontBold text-white mb-4">Enter any description for your NFT</p>

                            <div className="control-container-S sB mt-3 mb-1" id='cPar'>
                                <textarea
                                    placeholder='Description'
                                    rows={8}
                                    className="control-input-S" />
                            </div>
                        </div>
                    </div>

                    <button
                        // onClick={handleLog}
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
                </div>
            </div>
        </motion.div>
    )
}

export default CreateNFt