import { Action } from "redux";
import { initialState } from "./initialState";

export const newsPerPage = (state = initialState.newsPerPage, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};
