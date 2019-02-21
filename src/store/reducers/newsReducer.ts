import { INewsAction } from "../contracts";
import { initialState } from "./initialState";

export const news = (state = initialState.news, action: INewsAction) => {
    switch (action.type) {
        case "GET_NEWS_SUCCESS":
            return action.news;

        case "NEWS_CLEARED":
            return [];

        case "GET_MORE_NEWS_SUCCESS":
            return state.concat(action.news!);

        default:
            return state;
    }
};
