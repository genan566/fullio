import { TOGGLE_MODAL_SUSCRIPTION } from "../constants/ModalsConstants";

export const modalsReducer = (state = { showModalSuscription: false }, action: { type: string, payload: any }) => {
    switch (action.type) {

        case TOGGLE_MODAL_SUSCRIPTION:
            return { showModalSuscription: action.payload, }

        default:
            return state;
    }
}
