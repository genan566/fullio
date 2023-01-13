import React from 'react'

import { IoClose, IoBusiness, IoSettings, IoInfinite, IoLogOut, IoMenu, IoHome } from "react-icons/io5";

import NFT from "../imgs/nft.png";

import { FaQuinscape } from "react-icons/fa";

import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';
import { RootUserContext } from '../contexts/RootUserContext';



const SideNavs = ({ isOpen, toggleIsOpen, handleLog }:
    { isOpen: boolean, toggleIsOpen: () => void, handleLog: () => void }) => {


    const location = useLocation();
    const userContext = React.useContext(RootUserContext)

    const [isActive, setIsActive] = React.useState<string>(`${location?.pathname}`)

    // console.log('location', location.pathname.spl)

    return (

        <div className={!isOpen ? "custom-w-m" : "custom-w-m showing"}>

            <button
                onClick={toggleIsOpen} className="navs-close">
                {
                    isOpen ? <IoClose
                        color="white"
                        size={18}
                    /> : <IoMenu
                        color="white"
                        size={18}
                    />
                }
            </button>

            <div className="vertical-A gap-5 mt-12">

                <div
                    className="logoS">
                    <img src={NFT} alt="logo" />
                </div>
                {
                    isOpen && <>

                        <p className="text-md font-MontBold text-white mb-4">FULLIO</p>
                    </>
                }

                <Link
                    to={"/"}
                    onClick={() => setIsActive("/")}
                    className={isActive === "/" ? "customButtonFilterD-S p0 mt-4 active" : "customButtonFilterD-S p0 mt-4"}>
                    <IoHome
                        color={isActive === "/" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Acceuil</span>
                </Link>

                <Link
                    to={"/orders"}
                    onClick={() => setIsActive("/orders")} className={isActive === "/orders" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoBusiness
                        color={isActive === "/orders" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Mes Ordres</span>
                </Link>

                {/* <Link
                    to={"/strategies"}
                    onClick={() => setIsActive("/strategies")} className={isActive === "/strategies" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoInfinite
                        color={isActive === "/strategies" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Mes Stratégies</span>
                </Link> */}

                <Link
                    to={"/faqs"}
                    onClick={() => setIsActive("/faqs")} className={isActive === "/faqs" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <FaQuinscape
                        color={isActive === "/faqs" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>FAQS</span>
                </Link>



                <Link
                    to={"/settings"}
                    onClick={() => setIsActive("Paramètres")} className={isActive === "Paramètres" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoSettings
                        color={isActive === "Paramètres" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Paramètres</span>
                </Link>
            </div>

            {
                userContext?.user ?
                    <button
                        onClick={() => {
                            userContext.setUser(null)
                            localStorage.setItem('dataUser', JSON.stringify(null));
                        }}
                        className="customButtonFilterD-S d p0 mt-5">
                        <IoLogOut
                            color="white"
                            size={18}
                        />
                        <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.75rem' }}>Log Out</span>
                    </button >
                    : <button
                        onClick={handleLog}
                        className="customButtonFilterD-S danger p0 mt-5">
                        <IoLogOut
                            color="white"
                            size={18}
                        />
                        <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Login</span>
                    </button >
            }
        </div >
    )
}

export default SideNavs