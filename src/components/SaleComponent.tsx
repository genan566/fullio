import React from 'react'
import { routeAPIBaseImage } from '../APIs/APIRoutes';

import { AuthAPI } from '../APIs/AuthApi';
import { RootUserTokenContext } from '../contexts';
import ISOTOP from "../imgs/pexels-pixabay.jpg";
import { SaleHistory } from '../types/SaleHistoryType';
import { UserRetrieveInterface } from '../types/UserRetrieveTypes';
const SaleComponent = ({ item }: { item: SaleHistory }) => {
    const userTokenContext = React.useContext(RootUserTokenContext)


    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)

    React.useEffect(() => {
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

                    setuserRetrieveData
                        (formatedData)

                })
        }
    }, [])

    return (
        <>
            <div className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                <div className="flex row justify-center items-center max-w-[200px] flex-grow">
                    <div className="flex gap-2 row items-center justify-start w-fit" >
                        <img
                            className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                            src={userRetrieveData?.image || ISOTOP}
                            alt="user Profile" />
                        <p className="text-sm text-white font-MontSemiBold max-w-[120px] truncate">{userRetrieveData?.name || "Non défini"}</p>
                    </div>
                </div>
                <p className="text-white text-sm font-MontSemiBold flex-grow">{userRetrieveData?.email || "Anonyme"}</p>
                <p className="text-orange-500 text-sm font-MontSemiBold flex-grow">{item?.price}ETH</p>
                <p className="text-white text-sm font-MontSemiBold flex-grow">{item.created_at}</p>
                <p className="text-white text-sm font-MontSemiBold flex-grow">{item.will_end_at}</p>

            </div>
        </>
    )
}

export default SaleComponent