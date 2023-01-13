import React from 'react'
import { IoArrowDown, IoArrowUp } from 'react-icons/io5'

import "../styles/Accordion.scss"
import { AiOutlineMinus, AiOutlinePlus, } from "react-icons/ai";
const Accordion = ({ title, description }: { title: string | null, description: string | null }) => {


    const [isActive, setIsActive] = React.useState<boolean>(false)

    return (
        <div className="accordion">
            <button onClick={() => setIsActive(!isActive)} className="accordion-title">
                <p className="text-md text-black font-MontBold">{title}</p>
                {
                    !isActive ? <AiOutlinePlus
                        color={"black"}
                        size={18}
                    /> : <AiOutlineMinus
                        color={"black"}
                        size={18}
                    />
                }
            </button>

            {/* <div className="brs"></div> */}

            <div className={isActive ? "accordion-description showM" : "accordion-description"}>
                <p className="text-sm text-black font-MontRegular">{description}</p>
            </div>
        </div>
    )
}

export default Accordion