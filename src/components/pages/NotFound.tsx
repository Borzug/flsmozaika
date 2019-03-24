import i18next from "i18next";
import React from "react";
import { Link } from "react-router-dom";

import notfound from "../../assets/404.png";
import { Locale } from "../contracts";

interface IProps {
    locale: Locale;
    changeLanguage?: () => void;
}

export const NotFound: React.SFC<IProps> = ({ changeLanguage, locale }) => {
    return (
        <div>
            <div className="row mx-auto" style={{ width: "100%" }}>
                <h2 className="mx-auto p-3">{i18next.t("not_found")}</h2>
            </div>

            <div className="row mb-4">
                <img className="img-fluid mx-auto" src={notfound} alt="notfound" />
                <br />
            </div>

            <div className="row">
                <Link className="mx-auto" to="/">
                    <button className="btn btn-info mx-auto shadowed rounded-0">
                        {i18next.t("to_main")}
                    </button>
                </Link>
            </div>

            {locale !== Locale.RU && (
                <div className="row">
                    <button
                        id={Locale.RU}
                        className="btn btn-primary mx-auto mt-2 shadowed rounded-0"
                        onClick={changeLanguage}
                    >
                        {i18next.t("to_ru_locale")}
                    </button>
                </div>
            )}
        </div>
    );
};
