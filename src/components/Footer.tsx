import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoArrowDown, IoArrowForward, IoMail, IoPerson, IoSearch, IoSend } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom';
import { CoreContactsAPI } from '../APIs/CoreContacts';
import { RootUserContext } from '../contexts';

import ISOTOP from "../imgs/vadim-bogulov-lG4A4GmcYYg-unsplash.jpg";
import { notify } from '../utilities/Toaster';
import ErrorText from './ErrorText';

type Inputs = {
    name: string,
    firstname: string,
    email: string,
    // price: string,
};


const Footer = () => {

    const location = useLocation();
    const userContext = React.useContext(RootUserContext)

    const { register, handleSubmit,
        resetField, formState: { errors } } = useForm<Inputs>();

    const handlerForContacts = (gettedData: Inputs) => {
        let core_contacts = new CoreContactsAPI()

        core_contacts
            .create_subscription(gettedData)
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        handlerForContacts(data)
    };

    return (
        <>

            <form
                onSubmit={handleSubmit(onSubmit)}
                id='mailing'
                className="mt-[7rem] bg-slate-800 max-[1000px]:w-[95%] w-fit mx-auto max-[500px]:p-[1.8rem] min-[510px]:p-[1.5rem] min-[1000px]:p-[3rem] rounded-xl shadow-2xl">
                <div className="min-[1000px]:px-[1.5vw] max-w-[900px] mx-auto flex flex-row justify-center gap-[1rem] items-center max-[800px]:flex-wrap">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                        after:absolute after:top-0 after:left-0 after:bg-indigo-500 relative text-[1.9rem] leading-[2.5rem] py-4 w-[50%] max-[800px]:w-full">
                        Send us a mail
                    </h2>

                    <p className='text-white text-right text-sm w-[50%] max-[800px]:w-full'>If you are already here, you are probably interested in our product. Use the form below and <span className="text-white font-MontSemiBold">submit a purchase proposal.</span>
                        libero fugiat! Itaque.</p>
                </div>
                <div className="min-[1000px]:px-[1.5vw] max-w-[900px] mx-auto">

                    <div className=" mt-[1rem] flex justify-center items-center gap-[1rem] max-[600px]:flex-wrap">
                        <div className='w-full'>
                            <p className="text-xs font-MontBold text-white mb-4">Enter your name</p>

                            <div className="control-container-S mt-3 mb-1" id='cPar'>
                                <IoPerson
                                    color="white"
                                    size={18}
                                />
                                <input {...register("name", { required: true })}
                                    placeholder='Your name'
                                    type="text"
                                    className="control-input-S" />
                            </div>
                            {errors.name && <ErrorText />}
                        </div>

                        <div className='w-full'>
                            <p className="text-xs font-MontBold text-white mb-4">Enter your firstname</p>

                            <div className="control-container-S mt-3 mb-1" id='cPar'>
                                <IoPerson
                                    color="white"
                                    size={18}
                                />
                                <input {...register("firstname", { required: true })}
                                    placeholder='Your firstname'
                                    type="text"
                                    className="control-input-S" />
                            </div>
                            {errors.firstname && <ErrorText />}
                        </div>
                    </div>



                    <div className='w-full mt-[1rem]'>
                        <p className="text-xs font-MontBold text-white mb-4">Enter your mail</p>

                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                            <IoMail
                                color="white"
                                size={18}
                            />
                            <input {...register("email", { required: true })}
                                placeholder='Your mail'
                                type="email"
                                className="control-input-S" />
                        </div>{errors.email && <ErrorText />}
                    </div>
                    {/* 
                    <div className='w-full mt-[1rem]'>
                        <p className="text-xs font-MontBold text-white mb-4">Enter your message</p>

                        <div className="control-container-S sB mt-3 mb-1" id='cPar'>
                            <textarea
                                placeholder='Your message'
                                rows={8}
                                className="control-input-S" />
                        </div>
                    </div> */}
                </div>

                <button
                    // onClick={handleLog}
                    type='submit'
                    className="bg-violet-600 flex row items-center justify-center gap-1 w-fit  mx-auto mt-[2rem]
                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                        focus:outline-none
                        text-sm font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                            py-1 text-white px-[2rem]
                            rounded-lg">
                    <p className='mr-[.5rem]'>Suscribe Now</p>
                    <IoSend
                        // color="white"
                        size={17}
                    />
                </button>
            </form>
            <hr className='bg-gray-600 mt-[5rem] mx-auto' />
            <div className="flex max-w-[1300px] mx-auto justify-center gap-[1rem] px-[1rem] mt-[2rem]  max-[600px]:flex-wrap border-1">
                <div className="gap-[1rem] max-w-[250px]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Fullio</p>
                    <p className="text-white text-sm mt-[1rem]"><span className="font-MontSemiBold">Fullio</span> is a template created with the STUDIO tool. All information contained here is fictional and preview to create your own website.</p>
                </div>

                <div className="gap-[1rem]  max-w-[250px]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Navigation</p>
                    <div className="flex flex-wrap gap-4 min-w-[250px]">
                        <Link to={"/"}>
                            <p className={location.pathname === "/" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>Acceuil</p>
                        </Link>

                        <Link to={"/nftMarketPlace"}>
                            <p className={location.pathname === "/nftMarketPlace" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>MarketPlace</p>
                        </Link>

                        {
                            userContext.user?.is_staff && <Link to={"/manageNFTs"}>
                                <p className={location.pathname === "/manageNFTs" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>Manage NFTs</p>
                            </Link>
                        }


                        <Link to={"/faqs"}>
                            <p className={location.pathname === "/faqs" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>FAQs</p>
                        </Link>

                        <Link to={"/settings"}>
                            <p className={location.pathname === "/settings" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>Paramètres</p>
                        </Link>

                        <Link to={"/aboutPage"}>
                            <p className={location.pathname === "/aboutPage" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>About Us</p>
                        </Link>
                    </div>
                </div>

                <div className="gap-[1rem]  max-w-[250px]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Send Message</p>
                    <p className="text-white text-sm mt-[1rem]">
                        Privacy Policy
                        Our publishers
                        Contact
                        Send message

                        If you need help or have a question about Noplomi, please contact us and use our advanced form.</p>

                    {/* <a href="#mailing"

                        className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                        hover:bg-white hover:text-black mt-4
                        
                        focus:outline-none
                        text-sm font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                            py-1 text-white px-3
                            rounded-lg"> <p>Contact Us</p>
                        <IoArrowForward
                            // color="white"
                            size={17}
                        />
                    </a> */}
                </div>
            </div>
            <div className="flex justify-center">
                <p className="text-sm text-white font-MontSemiBold mt-7">Fullio@ 2022, @avodagbejeangontran@ All right reserved</p>
            </div>
        </>
    )
}

export default Footer