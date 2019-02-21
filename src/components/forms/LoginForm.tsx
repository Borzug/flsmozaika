import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as userActions from "../../store/actions/userActions";
import { IStore, IUserData } from "../../store/reducers/initialState";

interface IProps {
    user: IUserData;
    clearLoginErrors: () => void;
    login: (request: userActions.ILoginData) => void;
}

interface IState {
    username: string;
    password: string;
    checked: boolean;
}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            checked: false
        };
    }

    public componentWillUnmount() {
        this.props.clearLoginErrors();
    }

    public render() {
        return (
            <div className="card-body mx-auto">
                <div className="col-lg-8 col-xl-6 mx-auto mt-3">

                    <h5 className="text-center">{i18next.t("loginTitle")}</h5>

                    {this.props.user.error &&
                        <div className="text-center mt-4 text-danger">
                            {this.props.user.error === 403
                                ? <p>{i18next.t("wrong_credentials_login_error")}</p>
                                : <p>{i18next.t("no_connection_login_error")}</p>
                            }
                        </div>
                    }

                    <form className="mt-4" onSubmit={this.submit}>
                        <div className="form-group">
                            <label htmlFor="username">{i18next.t("usernameForm")}</label>
                            <input
                                type="text"
                                id="username"
                                name="log"
                                className="form-control"
                                aria-describedby="usernameHelp"
                                placeholder={i18next.t("usernamePlaceholder")}
                                onChange={this.handleUsernameChange}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">{i18next.t("passwordForm")}</label>
                            <input
                                type="password"
                                name="pwd"
                                className="form-control"
                                id="password"
                                placeholder={i18next.t("passwordPlaceholder")}
                                onChange={this.handlePasswordChange}
                                required={true}
                            />
                        </div>

                        <div className="form-check mb-4">
                            <label className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                <input type="checkbox" className="custom-control-input" onChange={this.handleCheck} />
                                <span className="custom-control-indicator" />
                                <span className="custom-control-description">{i18next.t("rememberMe")}</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block rounded-0"
                            onClick={this.submit}
                        >
                            {i18next.t("enterButton")}
                        </button>

                        <Link to="/signup">
                            <button className="btn btn-link btn-block" type="button">
                                <small className="text-muted">{i18next.t("registerButton")}</small>
                            </button>
                        </Link>

                        <Link to="/retrieve_password">
                            <button className="btn btn-link btn-block" type="button">
                                <small className="text-muted">{i18next.t("forgotPassword")}</small>
                            </button>
                        </Link>
                    </form>

                    {this.props.user.token && <Redirect to="/" />}
                </div>
            </div>
        );
    }

    private handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value });
    }

    private handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value });
    }

    private handleCheck = () => {
        this.setState({ checked: !this.state.checked });
    }

    private submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.login({ credentials: this.state });
    }
}

function mapState(state: IStore) {
    return {
        user: state.user
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return bindActionCreators(userActions, dispatch);
}

export const LoginForm = connect(mapState, mapDispatch)(Login);
