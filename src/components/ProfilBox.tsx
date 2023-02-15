import React from 'react'

import { IoCopy, IoHeart, IoEllipsisHorizontal, IoMenu, IoPerson, IoClose } from "react-icons/io5";
import { RootUserContext, } from '../contexts';

import CustomIMG2 from "../imgs/pexels-pixabay.jpg"

const ProfilBox = ({ handleLog, handlShow, handleLogOut }: { handleLog: () => void, handlShow: () => void, handleLogOut: () => void }) => {

    const userContext = React.useContext(RootUserContext)

    React.useEffect(() => {
        console.log("userContext", userContext)
    }, [])

    return (
        <div className="custom-w-d">

            <button
                onClick={handlShow}
                className="navs-close-L">
                    
                <IoClose
                    color="white"
                    size={18}
                />
            </button>

            <figure className="userProf">

                {
                    userContext?.user.id ? <>

                        <img
                            className="rounded-full object-cover"
                            src={userContext?.user.image || CustomIMG2}
                            alt="user Profile" />
                    </> : <>
                        <img
                            className="rounded-full object-cover"
                            src={CustomIMG2}
                            alt="user Profile" />
                    </>
                }

            </figure>

            <div className="mt-3 w-full" style={{ textAlign: 'center' }}>

                {
                    !userContext?.user.id && <>
                        <p className="text-slate-500 font-MontRegular text-sxl align-center my-5">Nothing to show now</p>
                    </>
                }


                {
                    !userContext?.user.id &&
                    <button
                        onClick={handleLog}
                        className="bg-violet-500
                            hover:bg-violet-600
                            active:bg-violet-700 
                            focus:outline-none 
                            text-sm
                            focus:ring-2
                            focus:ring-violet-300
                                py-2 text-white px-5
                                rounded-2xl">
                        Log In
                    </button>
                }


                {
                    !userContext?.user.id && <>
                        <p className="text-slate-400 font-MontSemiBold text-sm mt-12">Recent Activity</p>
                        <p className="text-slate-500 font-MontRegular text-sxl align-center my-5">Nothing to show now</p>
                    </>
                }

                {
                    userContext?.user.id && <>

                        <h3 className="text-xl font-MontBold text-slate-200">{userContext?.user?.name}</h3>
                        <div className="flex mt-3 gap-2 align-center"
                            style={{ textAlign: 'center', justifyContent: "center" }}>
                            <p className="text-sxl text-slate-500">{userContext?.user?.email}</p>
                            <IoCopy
                                color="rgba(255,255,255,.5)"
                                size={15}
                            />
                        </div>

                        <div className="flex gap-2 mt-5 align-center row px-3">
                            {/* <button className="bg-violet-500
                        hover:bg-violet-600
                        active:bg-violet-700 
                        focus:outline-none 
                        text-sm
                        focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-2xl">
                                Save changes
                            </button> */}

                            <button className="customButtonFilterD p0">
                                <IoHeart
                                    color="white"
                                    size={15}
                                />


                            </button>

                            <button className="customButtonFilterD p0">
                                <IoEllipsisHorizontal
                                    color="white"
                                    size={15}
                                />

                            </button>


                            <button
                                onClick={handleLogOut}
                                className="bg-red-500
                                hover:bg-red-600
                                active:bg-red-700 my-2
                                focus:outline-none 
                                text-sm
                                focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-2xl">
                                Se déconnecter
                            </button>
                        </div>

                        <div className="mt-5 flex row align-center">
                            <p className="text-slate-400 font-MontSemiBold text-sm">Recent Activity</p>
                            <p className="text-slate-400 font-MontRegular text-sm">See all</p>
                        </div>

                        {
                            [0, 1, 2, 3, 4].map(i => {
                                return (
                                    <>
                                        <div className="custom-userStatus mt-3">
                                            <img src={CustomIMG2} alt="user Profile" />
                                            <div style={{ textAlign: "left" }}>
                                                <p className="text-white font-MontSemiBold text-sm">John Amir</p>
                                                <p className="text-slate-400 font-MontRegular text-sxl">Quit art Purtial</p>
                                            </div>

                                            <p className="text-slate-400 font-MontRegular text-sm">See all</p>
                                        </div>
                                    </>)
                            })
                        }
                    </>
                }

            </div>
        </div>
    )
}

export default ProfilBox