import { IUserAction } from "../contracts";
import { initialState } from "./initialState";

export const user = (state = initialState.user, action: IUserAction) => {
    switch (action.type) {
        case "SIGNUP_SUCCESS":
            return Object.assign({}, state, { registeredOnThisSession: true });

        case "CLEAR_SIGNUP_DATA":
            return Object.assign({}, state, { registeredOnThisSession: false });

        case "USER_LOGGED_IN":
            return Object.assign({}, state, { loggedIn: true, token: action.token, error: "" });

        case "USER_LOGGED_OUT":
            return Object.assign({}, { loggedIn: false, token: null, error: "", profile: {}, userFormData: { meta: {} } });

        case "LOGIN_FAILED":
            return Object.assign({}, { loggedIn: false, token: null, error: action.error, profile: {} });

        case "CLEAR_LOGIN_ERRORS":
            return Object.assign({}, state, { error: "" });

        case "GET_USER_DATA_SUCCESS":
            return Object.assign({}, state, { profile: action.user, userFormData: action.user });

        case "USER_DATA_CHANGED":
            return Object.assign({}, state, { userFormData: action.user });

        default:
            return state;
    }
};
