import { SET_EDITABLE_USER_DATA } from "../constants/EditableUserConstant";

export const editableUserReducer = (state = { user: {}, }, action: { type: string, payload: any }) => {
    switch (action.type) {

        case SET_EDITABLE_USER_DATA:
            return { ...state, user: action.payload }

        default:
            return state;
    }
}
