import { IPage, Locale } from "../../components/contracts";

export interface IStore {
    news: IPage[];
    newsPerPage: number;
    currentPage: number;
    newsCount: number;
    newsOffset: number;
    pages: IPage[];
    favorites: IPage[];
    language: Locale;
    pendingRequests: IPendingRequests;
    search: ISearchData;
    user: IUserData;
}

export interface IPendingRequests {
    newsRequested: boolean;
    archiveRequested: boolean;
    pagesRequested: boolean;
    loginRequested: boolean;
}

export interface ISearchData {
    query: string;
    pages: IPage[];
    news: IPage[];
    favorites: IPage[];
}

export interface IUserData {
    id: number | null;
    loggedIn: boolean;
    registeredOnThisSession: boolean;
    token: string;
    error: number | null;
    profile: IUserProfile;
    userFormData: IMeta;
    meta: IMeta;
}

export interface IUserProfile {
    username?: string;
    password?: string;
    email?: string;
    name?: string;
    nickname?: string;
    description?: string;
    employment?: string;
    roles?: string[];
    meta?: IMeta;
}

export interface IMeta {
    [key: string]: any;
}

export const initialState: IStore = {
    news: [],
    newsPerPage: 10,
    currentPage: 1,
    newsCount: 0,
    newsOffset: 0,
    pages: [],
    favorites: [],
    language: Locale.RU,
    pendingRequests: {
        newsRequested: false,
        archiveRequested: false,
        pagesRequested: false,
        loginRequested: false
    },
    search: {
        query: "",
        pages: [],
        news: [],
        favorites: []
    },
    user: {
        id: null,
        loggedIn: false,
        registeredOnThisSession: false,
        token: "",
        error: null,
        profile: {},
        userFormData: {},
        meta: {}
    }
};
