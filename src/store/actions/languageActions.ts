import i18next from "i18next";

import { ILocaleAction } from "../contracts";

export function setLanguage(lng: string): ILocaleAction {
    i18next.init({
        lng,
        resources: require(`../../../public/i18next/${lng}.json`)
    });

    i18next.changeLanguage(lng);

    return {
        type: "LNG_CHANGE",
        lng
    };
}
