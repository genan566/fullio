import React from 'react'
import { RootModalsTypes } from '../types/RootModalsTypes';
import AdminCanCreateModal from './modals/AdminCanCreateModals';
import ModalForUserNotStaff from './modals/ModalForUserNotStaff';
import ModalAddingFAQs from './modals/ModalsAddingFAQs';
import ModalsCategories from './modals/ModalsCategories';
import ModalsEditUserByAdmin from './modals/ModalsEditUserByAdmin';
import ModalsLoadingMoreAccountDataWalletBTC from './modals/ModalsLoadingMoreAccountDataBTC';
import ModalsLoadingMoreAccountDataWalletETH from './modals/ModalsLoadingMoreAccountDataETH';
import ModalsLogOut from './modals/ModalsLogOut';
import ModalsOnSearch from './modals/ModalsOnSearch';
import ModalsShowingLogin from './modals/ModalsShowingLogin';
import ModalsShowingSignin from './modals/ModalsShowingSignin';
import ModalSubscription from './modals/ModalsSubscription';
import ModalsUpdateUserInfo from './modals/ModalsUpdateUserInfo';

const RootModals = ({ isShownModalsSignIn,
    isShownModalsFirstSignIn, toggleShowSignUpModal,
    isOpenResearch, isShownModalsLogOut, toggleShowSigninModal,
    navLogin, navSignin,
    toggleModalsOnLogout, toggleOnResearch, errorFuncOnLogIn, 
    responseGoogle, handlerLogoutFunc }:
    RootModalsTypes
) => {

    return (
        <>
            <ModalsUpdateUserInfo />
            <ModalsLoadingMoreAccountDataWalletETH />
            <ModalsLoadingMoreAccountDataWalletBTC />
            <ModalsCategories />
            <ModalSubscription />
            <AdminCanCreateModal />
            <ModalAddingFAQs />
            <ModalsEditUserByAdmin />
            <ModalsShowingLogin
                navSignin={navSignin}
                errorFuncOnLogIn={errorFuncOnLogIn}
                responseGoogle={responseGoogle}
                isShownModalsSignIn={isShownModalsSignIn}
                toggleShowSigninModal={toggleShowSigninModal} />

            <ModalsShowingSignin
                navLogin={navLogin}
                errorFuncOnLogIn={errorFuncOnLogIn}
                responseGoogle={responseGoogle}
                isShownModalsFirstSignIn={isShownModalsFirstSignIn}
                toggleShowSignUpModal={toggleShowSignUpModal} />

            <ModalsOnSearch
                isOpenResearch={isOpenResearch}
                toggleOnResearch={toggleOnResearch}
            />

            <ModalsLogOut
                toggleModalsOnLogout={toggleModalsOnLogout}
                isShownModalsLogOut={isShownModalsLogOut}
                handlerLogoutFunc={handlerLogoutFunc}
            />

            <ModalForUserNotStaff />
        </>
    )
}

export default RootModals