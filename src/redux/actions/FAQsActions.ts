import { AnyAction, Dispatch } from "redux";
import { useAppDispatch } from "../../hooks/modalsHooks";
import { TOGGLE_MODAL_SUSCRIPTION } from "../constants/ModalsConstants"
import { AppDispatch } from "../store"

export const actionShowModalForSuscription = (data: boolean) => async (dispatch: Dispatch<{
    type: string;
    payload: any;
} | any>) => {
    console.log(data)

    dispatch({ type: TOGGLE_MODAL_SUSCRIPTION, payload: data })
}