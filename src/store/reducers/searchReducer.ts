import { ISearchAction } from "../contracts";
import { initialState } from "./initialState";

export const search = (state = initialState.search, action: ISearchAction) => {
    switch (action.type) {
        case "SET_SEARCH":
            return Object.assign({}, state, { query: action.query });

        case "SEARCH_NEWS_SUCCESS":
            return Object.assign({}, state, { news: action.news });

        case "SEARCH_MORE_NEWS_SUCCESS":
            return Object.assign({}, state, { news: state.news.concat(action.news!) });

        case "SEARCH_PAGES_SUCCESS":
            return Object.assign({}, state, { pages: action.pages });

        case "SEARCH_FAVORITES_SUCCESS":
            return Object.assign({}, state, { favorites: action.pages });

        case "SEARCH_CLEARED":
            return Object.assign({}, { pages: [], news: [] });

        default:
            return state;
    }
};
