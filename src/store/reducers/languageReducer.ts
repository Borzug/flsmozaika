import { ILocaleAction } from "../contracts";
import { initialState } from "./initialState";

export const language = (state = initialState.language, action: ILocaleAction) => {
    switch (action.type) {
        case "LNG_CHANGE":
            return action.lng;

        default:
            return state;
    }
};
