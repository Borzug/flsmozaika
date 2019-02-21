import { IPagesAction } from "../contracts";
import { initialState } from "./initialState";

export const favorites = (state = initialState.favorites, action: IPagesAction) => {
    switch (action.type) {
        case "GET_FAVORITES_SUCCESS":
            return action.pages;

        default:
            return state;
    }
};
