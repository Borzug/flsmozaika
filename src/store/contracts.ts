import { Action } from "redux";
import { IPage } from "../components/contracts";

export interface IUserAction extends Action {
    token?: string;
    error?: string;
    user?: string;
}

export interface IPagesAction extends Action {
    pages?: IPage[];
}

export interface INewsAction extends Action {
    news?: IPage[];
}

export type ISearchAction = INewsAction & IPagesAction & {
    query?: string;
};

export interface ICountAction extends Action {
    count?: number;
}

export interface ILocaleAction extends Action {
    lng?: string;
}

export interface IStore {
    news: IPage[];
    newsPerPage: number;
    currentPage: number;
    newsCount: number;
    newsOffset: number;
    pages: IPage[];
    favorites: IPage[];
    language: string;
    pendingRequests: IPendingRequests;
    search: ISearchData;
    user: IUserData;
}

export interface IPendingRequests {
    newsRequested: boolean;
    archiveRequested: boolean;
    pagesRequested: boolean;
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
