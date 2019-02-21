import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { IStore } from "./reducers/initialState";
import { rootReducer } from "./reducers/rootReducer";

export const configureStore = (initialState: IStore) => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
};
