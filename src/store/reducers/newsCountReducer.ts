import { ICountAction } from "../contracts";
import { initialState } from "./initialState";

export const newsCount = (state = initialState.newsCount, action: ICountAction) => {
    switch (action.type) {
        case "NEWS_COUNT_CHANGED":
            return action.count;

        default:
            return state;
    }
};
