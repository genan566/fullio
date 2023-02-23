import {
    EDITABLE_USER,
    TOGGLE_MODALS_EDIT_USERS,
    TOGGLE_MODAL_ADDING_FAQS,
    TOGGLE_MODAL_FOR_CATEGORIES,
    TOGGLE_MODAL_FOR_LOADING_MORE_WALLET_BTC,
    TOGGLE_MODAL_FOR_LOADING_MORE_WALLET_ETH,
    TOGGLE_MODAL_FOR_LOGIN,
    TOGGLE_MODAL_FOR_SIGNUP,
    TOGGLE_MODAL_SUSCRIPTION,
    TOGGLE_MODAL_UPDATE_USER_INFO
} from "../constants/ModalsConstants";

export const modalsReducer = (state = {
    showModalSuscription: false,
    showModalAddingFAQs: false,
    showModalUpdateUserInfo: false,
    showModalForLogin: false,
    showModalForSignUp: false,
    showModalForLoadingMoreWalletETH: false,
    showModalForLoadingMoreWalletBTC: false,
    showModalForCategories: false,
    showModalEditUser: false,
}, action: { type: string, payload: any }) => {
    switch (action.type) {

        case TOGGLE_MODAL_SUSCRIPTION:
            return { showModalSuscription: action.payload, }

        case TOGGLE_MODAL_ADDING_FAQS:
            return { showModalAddingFAQs: action.payload, }

        case TOGGLE_MODAL_UPDATE_USER_INFO:
            return { showModalUpdateUserInfo: action.payload, }

        case TOGGLE_MODAL_FOR_LOGIN:
            return { showModalForLogin: action.payload, }

        case TOGGLE_MODAL_FOR_SIGNUP:
            return { showModalForSignUp: action.payload, }

        case TOGGLE_MODAL_FOR_LOADING_MORE_WALLET_ETH:
            return { showModalForLoadingMoreWalletETH: action.payload, }

        case TOGGLE_MODAL_FOR_LOADING_MORE_WALLET_BTC:
            return { showModalForLoadingMoreWalletBTC: action.payload, }

        case TOGGLE_MODAL_FOR_CATEGORIES:
            return { showModalForCategories: action.payload, }

        case TOGGLE_MODALS_EDIT_USERS:
            return { showModalEditUser: action.payload, }

        default:
            return state;
    }
}
