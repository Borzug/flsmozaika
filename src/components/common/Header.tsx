import classNames from "classnames";
import i18next from "i18next";
import * as React from "react";
import { Link } from "react-router-dom";

import brand from "../../assets/brand.png";
import { Locale } from "../contracts";
import { Search } from "../forms/Search";
import { LanguageTrigger } from "./LanguageTrigger";

interface IProps {
    locale: Locale;
    user: any;
    changeLanguage: (lng: Locale) => void;
    getUserData: () => void;
}

interface IState {
    isLngSelectorOpened: boolean;
}

export class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = { isLngSelectorOpened: false };
    }

    public render() {
        const { locale, user, getUserData } = this.props;

        return (
            <nav className="navbar navbar-expand fixed-top navbar-light bg-light py-0 border">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item my-auto mr-2">
                        <a className="nav-link" href="#start">
                            <img src={brand} width="45" alt="logo" /><span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item my-auto">
                        <Search />
                    </li>
                </ul>

                <div className="dropdown">
                    <button
                        type="button"
                        id="languageSelectButton"
                        className="btn btn-danger btn-sm dropdown-toggle mr-sm-1 mr-md-3 my-2 my-lg-0 mr-2 shadowed rounded-0"
                        onClick={this.toggleLngSelector}
                    >
                        {locale}
                    </button>

                    <div
                        className={classNames({
                            "d-none": !this.state.isLngSelectorOpened,
                            "language-selector": this.state.isLngSelectorOpened
                        })}
                    >
                        <LanguageTrigger value={Locale.RU} text={Locale.RU} changeLanguage={this.changeLanguage} />
                        <div className="dropdown-divider my-0" />
                        <LanguageTrigger value={Locale.EN} text={Locale.EN} changeLanguage={this.changeLanguage} />
                    </div>
                </div>

                {user.loggedIn
                    ? (
                        <Link to="/user">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm btn-profile mr-2 my-2 my-lg-0 shadowed rounded-0"
                                onClick={getUserData}
                            >
                                {i18next.t("cabinetButton")}
                            </button>
                        </Link>
                    )
                    : (
                        <Link to="/login">
                            <button type="button" className="btn btn-secondary btn-sm btn-login mr-2 my-2 my-lg-0 shadowed rounded-0">
                                {i18next.t("login")}
                            </button>
                        </Link>
                    )
                }
            </nav>
        );
    }

    private toggleLngSelector = () => {
        this.setState(() => ({
            isLngSelectorOpened: !this.state.isLngSelectorOpened
        }));
    }

    private changeLanguage = (lng: Locale) => {
        this.toggleLngSelector();
        this.props.changeLanguage(lng);
    }
}
