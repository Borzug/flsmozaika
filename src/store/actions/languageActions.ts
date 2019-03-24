import i18next from "i18next";

import { Locale } from "../../components/contracts";
import en from "../../i18next/en.json";
import ru from "../../i18next/ru.json";
import { ILocaleAction } from "../contracts";

export function setLanguage(lng: Locale): ILocaleAction {
    i18next.init({
        lng: String(lng).toLowerCase(),
        resources: lng === Locale.RU ? ru : en
    });

    return {
        lng,
        type: "LNG_CHANGE"
    };
}
