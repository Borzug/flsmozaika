import i18next from "i18next";
import * as React from "react";
import { Link } from "react-router-dom";

import boxIcon from "../../assets/box.svg";
import dollarIcon from "../../assets/credit.svg";
import featherIcon from "../../assets/feather.svg";
import homeIcon from "../../assets/home.svg";
import imagesIcon from "../../assets/images.svg";
import logo from "../../assets/logo.jpg";
import manIcon from "../../assets/man.svg";
import publishIcon from "../../assets/publish.svg";
import starIcon from "../../assets/star.svg";
import usersIcon from "../../assets/users.svg";
import vcardIcon from "../../assets/v-card.svg";
import { Locale } from "../contracts";

interface IProps {
    locale: string;
}

export const SideMenu: React.SFC<IProps> = ({ locale }) => {
    return (
        <aside className="order-xs-1 menu p-0">
            <div className="border border-top-0 border-left-0">
                <div className="logo">
                    <Link to="/">
                        <img id="logo" className="img-fluid" src={logo} alt="logo" />
                    </Link>
                </div>

                <div>
                    <button
                        className="toggle-menu btn btn-block p-0 rounded-0 hamburger"
                        data-toggle="collapse"
                        data-target="menu-links"
                        aria-expanded="false"
                        aria-controls="menu-links"
                        type="button"
                    >
                        <div className="mx-auto">
                            <div className="bar1" />
                            <div className="bar2" />
                            <div className="bar3" />
                        </div>
                    </button>

                    <div className="collapse show" id="menu-links">
                        <Link to="/" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button" >
                            <img className="menu-icon" src={homeIcon} width="20" alt="новости" />
                            &nbsp;&nbsp;
                            {i18next.t("news")}
                            {locale !== Locale.RU && <span style={{ backgroundColor: "red", float: "right" }}>&nbsp;RU&nbsp;</span>}
                        </Link>

                        <Link to="/about" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                            <img className="menu-icon" src={manIcon} width="20" alt="о нас" />&nbsp;&nbsp;{i18next.t("about")}
                        </Link>

                        <Link to="/editorial_board" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                            <img className="menu-icon" src={usersIcon} width="20" alt="редколлегия" />&nbsp;&nbsp;{i18next.t("editorial")}
                        </Link>

                        <Link to="/contacts" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                            <img className="menu-icon" src={vcardIcon} width="20" alt="контакты" />&nbsp;&nbsp;{i18next.t("contacts")}
                        </Link>

                        <Link to="/to_authors" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                            <img className="menu-icon" src={featherIcon} width="20" alt="авторам" />&nbsp;&nbsp;{i18next.t("to_authors")}
                        </Link>

                        {
                            locale === Locale.RU &&
                            <div>
                                <Link to="/to_advertisers" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                                    <img className="menu-icon" src={dollarIcon} width="20" alt="рекламодателям" />
                                    &nbsp;&nbsp;{i18next.t("to_advertisers")}
                                </Link>

                                <Link to="/subscription" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                                    <img className="menu-icon" src={imagesIcon} width="20" alt="подписка" />
                                    &nbsp;&nbsp;{i18next.t("subscription")}
                                </Link>

                                <Link to="/new_materials" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                                    <img className="menu-icon" src={publishIcon} width="20" alt="готовится к публикации" />
                                    &nbsp;&nbsp;{i18next.t("new_materials")}
                                </Link>

                                <Link to="/archive" className="btn btn-light btn-block rounded-0 border-0 m-0" role="button">
                                    <img className="menu-icon" src={boxIcon} width="20" alt="архив" />
                                    &nbsp;&nbsp;{i18next.t("archive")}
                                </Link>

                                <Link
                                    to={{ pathname: "/favorites", state: { page: -1 } }}
                                    className="btn btn-light btn-block rounded-0 border-0 m-0"
                                    role="button"
                                >
                                    <img className="menu-icon" src={starIcon} width="20" alt="избранное" />
                                    &nbsp;&nbsp;{i18next.t("favorites")}
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </aside>
    );
};
