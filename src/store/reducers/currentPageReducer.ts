import { Action } from "redux";
import { initialState } from "./initialState";

interface IAction extends Action {
    num?: number;
}

export const currentPage = (state = initialState.currentPage, action: IAction) => {
    switch (action.type) {
        case "PAGE_CHANGED":
            return action.num;

        default:
            return state;
    }
};
