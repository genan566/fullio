import { legacy_createStore as createStore, combineReducers, applyMiddleware, legacy_createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from "redux-thunk"
import { faqsReducer } from './reducers/FAQsReducer'
import { modalsReducer } from './reducers/ModalsReducer'

const reducer = combineReducers({
    modalsReducer: modalsReducer,
    faqsReducer: faqsReducer,
})

const middleware = [thunk]

const store = legacy_createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;