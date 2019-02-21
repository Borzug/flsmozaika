import { Action } from "redux";
import { initialState } from "./initialState";

export const pendingRequests = (state = initialState.pendingRequests, action: Action) => {
    switch (action.type) {
        case "REQUEST_OPEN":
            return Object.assign({}, state, { newsRequested: true });

        case "REQUEST_CLOSE":
            return Object.assign({}, state, { newsRequested: false });

        case "REQUEST_PAGES_OPEN":
            return Object.assign({}, state, { pagesRequested: true });

        case "REQUEST_PAGES_CLOSE":
            return Object.assign({}, state, { pagesRequested: false });

        case "REQUEST_ARCHIVE_OPEN":
            return Object.assign({}, state, { archiveRequested: true });

        case "REQUEST_ARCHIVE_CLOSE":
            return Object.assign({}, state, { archiveRequested: false });

        default:
            return state;
    }
};
