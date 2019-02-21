import { Action, Dispatch } from "redux";
import { api } from "../../api/api";
import { IPage } from "../../components/contracts";

export interface IPagesRequest {
    search?: string;
    exclude?: string;
    parentExclude?: string;
}

export function getPages({ search, exclude, parentExclude }: IPagesRequest): any {
    return (dispatch: Dispatch<Action>) => {
        dispatch(requestPagesStart());

        return api.getPages(search, exclude, parentExclude)
            .then((pages) => {
                if (!search) {
                    dispatch(getPagesSuccess(pages));
                } else {
                    dispatch(searchPagesSuccess(pages));
                }
                dispatch(requestPagesEnd());
            })
            .catch((error) => {
                dispatch(getPagesSuccess([noConnectionPage]));
                dispatch(requestPagesEnd());
            });
    };
}

export function requestPagesStart() {
    return {
        type: "REQUEST_PAGES_OPEN"
    };
}

export function requestPagesEnd() {
    return {
        type: "REQUEST_PAGES_CLOSE"
    };
}

export function getFavorites(search?: string): any {
    return (dispatch: Dispatch<Action>) => {
        dispatch(requestArchiveStart());

        return api.getFavorites(search)
            .then((pages) => {
                if (!search) {
                    dispatch(getFavoritesSuccess(pages));
                } else {
                    dispatch(searchFavoritesSuccess(pages));
                }
                dispatch(requestArchiveEnd());
            })
            .catch((error) => {
                dispatch(getPagesSuccess([noConnectionPage]));
                dispatch(requestArchiveEnd());
            });
    };
}

export function requestArchiveStart() {
    return {
        type: "REQUEST_ARCHIVE_OPEN"
    };
}

export function requestArchiveEnd() {
    return {
        type: "REQUEST_ARCHIVE_CLOSE"
    };
}

export function getPagesSuccess(pages: IPage[]) {
    return {
        type: "GET_PAGES_SUCCESS",
        pages
    };
}

export function searchPagesSuccess(pages: IPage[]) {
    return {
        type: "SEARCH_PAGES_SUCCESS",
        pages
    };
}

export function getFavoritesSuccess(pages: IPage[]) {
    return {
        type: "GET_FAVORITES_SUCCESS",
        pages
    };
}

export function searchFavoritesSuccess(pages: IPage[]) {
    return {
        type: "SEARCH_FAVORITES_SUCCESS",
        pages
    };
}

const noConnectionPage = {
    title: {
        rendered: "Ошибка соединения!"
    },
    content: {
        rendered: "<div class='errorpage'>К сожалению, данная страница в данный момент недоступна.</div>"
    }
};
