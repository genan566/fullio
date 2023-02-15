import { TOGGLE_MODAL_ADDING_FAQS, TOGGLE_MODAL_SUSCRIPTION, TOGGLE_MODAL_UPDATE_USER_INFO } from "../constants/ModalsConstants";

export const modalsReducer = (state = {
    showModalSuscription: false,
    showModalAddingFAQs: false, showModalUpdateUserInfo: false,
}, action: { type: string, payload: any }) => {
    switch (action.type) {

        case TOGGLE_MODAL_SUSCRIPTION:
            return { showModalSuscription: action.payload, }

        case TOGGLE_MODAL_ADDING_FAQS:
            return { showModalAddingFAQs: action.payload, }

        case TOGGLE_MODAL_UPDATE_USER_INFO:
            return { showModalUpdateUserInfo: action.payload, }

        default:
            return state;
    }
}
