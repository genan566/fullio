import React from 'react'

import { IoClose, IoBusiness, IoSettings, IoInfinite, IoLogOut, IoLogIn, IoMenu, IoHome, IoMedkit, IoInformation, IoAtCircleOutline } from "react-icons/io5";
import { BsCollection } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";

import NFT from "../imgs/nft.png";

import { FaQuinscape } from "react-icons/fa";

import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';
import { RootUserContext } from '../contexts';
import { GiVirtualMarker } from 'react-icons/gi';



const SideNavs = ({ isOpen, toggleIsOpen, handleLog, handleLogOut }:
    { isOpen: boolean, toggleIsOpen: () => void, handleLog: () => void, handleLogOut: () => void }) => {


    const location = useLocation();
    const userContext = React.useContext(RootUserContext)

    const [isActive, setIsActive] = React.useState<string>(`${location?.pathname}`)

    React.useEffect(() => {
        setIsActive(`${location?.pathname}`)
    }, [location])

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

                        <p className="text-md font-MontBold text-white">FULLIO</p>
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
                    to={"/nftMarketPlace"}
                    onClick={() => setIsActive("/nftMarketPlace")} className={isActive === "/nftMarketPlace" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <GiVirtualMarker
                        color={isActive === "/nftMarketPlace" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Market Place</span>
                </Link>

                {
                    userContext.user.is_staff && <Link
                        to={"/manageNFTs"}
                        onClick={() => setIsActive("/manageNFTs")} className={((isActive === "/manageNFTs") || (isActive === "/createNFt")) ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                        <MdOutlineDashboardCustomize
                            color={((isActive === "/manageNFTs") || (isActive === "/createNFt")) ? "black" : "white"}
                            size={18}
                        />
                        <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Manage NFTs</span>
                    </Link>
                }

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
                    onClick={() => setIsActive("Paramètres")} className={isActive === "/settings" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoSettings
                        color={isActive === "/settings" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Paramètres</span>
                </Link>




                {/* <Link
                    to={"/collectionsPage"}
                    onClick={() => setIsActive("/collectionsPage")} className={isActive === "/collectionsPage" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <BsCollection
                        color={isActive === "/collectionsPage" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Collections</span>
                </Link> */}

                <Link
                    to={"/aboutPage"}
                    onClick={() => setIsActive("/aboutPage")} className={isActive === "/aboutPage" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoAtCircleOutline
                        color={isActive === "/aboutPage" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>About Us</span>
                </Link>

            </div>

            {
                userContext?.user ?
                    <button
                        onClick={handleLogOut}
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
                        <IoLogIn
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