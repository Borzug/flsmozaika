import { ISearchAction } from "../contracts";

export function clearSearch() {
    return {
        type: "SEARCH_CLEARED"
    };
}

export function setSearch(query: string): ISearchAction {
    return {
        type: "SET_SEARCH",
        query
    };
}
