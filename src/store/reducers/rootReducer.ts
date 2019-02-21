import { combineReducers } from "redux";

import { currentPage } from "./currentPageReducer";
import { favorites } from "./favoritesReducer";
import { language } from "./languageReducer";
import { newsCount } from "./newsCountReducer";
import { newsPerPage } from "./newsPerPageReducer";
import { news } from "./newsReducer";
import { pages } from "./pagesReducer";
import { pendingRequests } from "./requestReducer";
import { search } from "./searchReducer";
import { user } from "./userReducer";

export const rootReducer = combineReducers({
    news,
    pages,
    favorites,
    newsPerPage,
    currentPage,
    newsCount,
    language,
    pendingRequests,
    search,
    user
});
