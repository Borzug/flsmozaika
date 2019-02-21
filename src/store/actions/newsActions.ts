import { Action, Dispatch } from "redux";
import { api } from "../../api/api";

export interface INewsRequest {
    perPage?: number;
    search?: string;
    page?: number;
    offset?: number;
}

export function getNews({ perPage, search, page }: INewsRequest): any {
    return (dispatch: any) => {
        dispatch(requestStart());

        return api.getNews(perPage, search, page)
            .then((news) => {
                if (!search && news.length > 0) {
                    dispatch(getNewsSuccess(news));
                } else if (!search && news.length === 0) {
                    dispatch(getNewsSuccess([noConnectionWarning]));
                } else if (news.length > 0) {
                    dispatch(searchNewsSuccess(news));
                }
                dispatch(requestEnd());
            })
            .catch((error) => {
                dispatch(requestEnd());
                if (!search) {
                    dispatch(getNewsSuccess([noConnectionWarning]));
                } else {
                    dispatch(searchNewsSuccess([noConnectionWarning]));
                }
            });
    };
}

export function getMoreNews({ offset, perPage, search, page }: INewsRequest) {
    return (dispatch: any) => {
        dispatch(requestStart());
        return api.getMoreNews(perPage, search, page, offset)
            .then((news) => {
                if (!search) {
                    dispatch(getMoreNewsSuccess(news));
                } else {
                    dispatch(searchMoreNewsSuccess(news));
                }
                dispatch(requestEnd());
            })
            .catch((error) => {
                dispatch(requestEnd());
                dispatch(getNewsSuccess([noConnectionWarning]));
            });
    };
}

export function getNewsCount(): any {
    return (dispatch: Dispatch<Action>) => {
        return api.getNewsCount()
            .then((count) => dispatch(getNewsCountSuccess(count)))
            .catch((error) => window.console.log(error));
    };
}

export function requestStart() {
    return {
        type: "REQUEST_OPEN"
    };
}

export function requestEnd() {
    return {
        type: "REQUEST_CLOSE"
    };
}

export function getNewsSuccess(news: any) {
    return {
        type: "GET_NEWS_SUCCESS",
        news
    };
}

export function getMoreNewsSuccess(news: any) {
    return {
        type: "GET_MORE_NEWS_SUCCESS",
        news
    };
}

export function searchNewsSuccess(news: any) {
    return {
        type: "SEARCH_NEWS_SUCCESS",
        news
    };
}

export function searchMoreNewsSuccess(news: any) {
    return {
        type: "SEARCH_MORE_NEWS_SUCCESS",
        news
    };
}

export function getNewsCountSuccess(count: any) {
    return {
        type: "NEWS_COUNT_CHANGED",
        count
    };
}

export function clearNews() {
    return {
        type: "NEWS_CLEARED"
    };
}

export function changePage(num: number) {
    return {
        type: "PAGE_CHANGED",
        num
    };
}

const noConnectionWarning = {
    title: {
        rendered: "Ошибка!"
    },
    content: {
        rendered:
            `<div style='text-align: center'><p>К сожалению, в данный момент на сайте ведутся технические работы,
            и наши материалы могут быть временно недоступны. Попробуйте обновить страницу позднее.</p>
            <p>Приносим извинения за доставленные неудобства!</p></div>`
    }
};
