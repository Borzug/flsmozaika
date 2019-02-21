import { IPagesAction } from "../contracts";
import { initialState } from "./initialState";

export const pages = (state = initialState.pages, action: IPagesAction) => {
    switch (action.type) {
        case "GET_PAGES_SUCCESS":
            return action.pages;

        default:
            return state;
    }
};
