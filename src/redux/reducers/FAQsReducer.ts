import { ADDING_FAQS, SET_FAQS, TOGGLE_LOADING } from "../constants/FAQsConstants";

export const faqsReducer = (state = { stateFAQs: [], loading: false }, action: { type: string, payload: any }) => {
    switch (action.type) {

        case ADDING_FAQS:
            return { ...state, stateFAQs: [...state.stateFAQs, action.payload], loading: false }

        case SET_FAQS:
            return { ...state, stateFAQs: [...action.payload], loading: false }

        case TOGGLE_LOADING:
            return { ...state, loading: action.payload, }

        default:
            return state;
    }
}
