import i18next from "i18next";

import { ILocaleAction } from "../contracts";

export function setLanguage(lng: string): ILocaleAction {
    return {
        type: "LNG_CHANGE",
        lng
    };
}
