import i18next from "i18next";
import { Action, Dispatch } from "redux";
import toastr from "toastr";
import { api } from "../../api/api";
import { Cookie } from "../../Cookie";
import { IUserProfile } from "../reducers/initialState";

export interface ILoginData {
    token?: string;
    credentials?: ICredentials;
}

export interface ICredentials {
    username: string;
    password: string;
    checked?: boolean;
}

const cookie = new Cookie();

export function signup(user: IUserProfile) {
    return (dispatch: Dispatch<Action>) => {
        return api.signup<{ status: string, cookie: string, error: string }>(user)
            .then((response) => {
                if (response.status === "ok") {
                    setDefaultUserMeta(response.cookie);
                    toastr.success(`${i18next.t("welcome_login_info")}.`, `${i18next.t("welcome_login")}!`);
                    dispatch(signupSuccess());
                }
                if (response.status === "error") {
                    toastr.error(`${i18next.t(response.error.replace(/\s+/g, "").slice(0, -1))}`);
                }
            })
            .catch((error) => {
                toastr.error(`${i18next.t(error.replace(/\s+/g, "").slice(0, -1))}`);
            });
    };
}

export function signupSuccess() {
    return {
        type: "SIGNUP_SUCCESS"
    };
}

export function clearSignupData() {
    return {
        type: "CLEAR_SIGNUP_DATA"
    };
}

export function login({ token, credentials }: ILoginData): any {
    return (dispatch: Dispatch<Action>) => {
        if (token) {
            return api.validateToken(token)
                .then((isValid) => {
                    if (isValid) {
                        dispatch(loggedIn({ token }));
                        getUserData(token);
                    }
                })
                .catch((error) => window.console.log(error.message));

        } else if (credentials) {
            return api.login<{ token: string, data: { status: string }, user_display_name: string }>(credentials)
                .then((response) => {
                    if (response.token) {
                        dispatch(loggedIn({
                            credentials,
                            token: response.token
                        }));
                        getUserData(response.token);
                        toastr.success(`${i18next.t("welcome_login")}, ${response.user_display_name}`);
                    } else {
                        dispatch(loginFailed(response.data.status));
                    }
                })
                .catch((error) => {
                    dispatch(loginFailed(error));
                });
        }

        return;
    };
}

export function loggedIn({ token, credentials }: ILoginData) {
    if (credentials && credentials.checked) {
        cookie.setCookie({ name: "token", value: token, options: { expires: 1000 * 60 * 60 * 24 * 365 } });
    }

    return {
        type: "USER_LOGGED_IN",
        token
    };
}

export function loginFailed(error: string) {
    return {
        type: "LOGIN_FAILED",
        error
    };
}

export function clearLoginErrors() {
    return {
        type: "CLEAR_LOGIN_ERRORS"
    };
}

export function loggedOut() {
    cookie.setCookie({ name: "token", value: "", options: { expires: 1 } });
    return {
        type: "USER_LOGGED_OUT"
    };
}

export function getUserData(token: string) {
    return (dispatch: Dispatch<Action>) => {
        return api.getUserData(token)
            .then((response) => {
                dispatch(getUserDataSuccess(response));
            })
            .catch((error) => window.console.log(error));
    };
}

export function getUserDataSuccess(user: IUserProfile) {
    return {
        type: "GET_USER_DATA_SUCCESS",
        user
    };
}

export function setDefaultUserMeta(userCookie: string) {
    return () => {
        return api.setDefaultUserMeta(userCookie)
            .then((response) => {
                window.console.log(response);
            })
            .catch((error) => window.console.log(error));
    };
}

export function updateUser(user: IUserProfile, token: string) {
    return () => {
        return api.updateUser(user, token)
            .then(() => {
                toastr.info(`${i18next.t("user_data_updated")}.`);
            })
            .catch((error) => {
                toastr.error(`${i18next.t("user_data_update_error")}. ${error.message}`, `${i18next.t("error")}`);
            });
    };
}

export function handleUserDataChange(user: IUserProfile) {
    return {
        type: "USER_DATA_CHANGED",
        user
    };
}

export function retrievePassword(username: string) {
    return () => {
        return api.retrievePassword(username)
            .then(() => {
                toastr.info(`${i18next.t("retrieve_password_toast")}.`);
            })
            .catch((error) => {
                window.console.log(error);
            });
    };
}
