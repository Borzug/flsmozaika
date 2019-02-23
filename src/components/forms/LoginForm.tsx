import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as userActions from "../../store/actions/userActions";
import { IStore, IUserData } from "../../store/reducers/initialState";
import { FormFields } from "../contracts";
import { Loading } from "../views/Loading";
import { TextInput } from "./TextInput";

interface IProps {
    user: IUserData;
    requestingLogin: boolean;
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
        const { user, requestingLogin } = this.props;

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

                    {!requestingLogin
                        ? (
                            <form className="mt-4" onSubmit={this.submit}>
                                <div className="form-group">
                                    <TextInput
                                        type="text"
                                        name={FormFields.Username}
                                        label={i18next.t("usernameForm")}
                                        placeholder={i18next.t("usernamePlaceholder")}
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group">
                                    <TextInput
                                        type="password"
                                        name={FormFields.Password}
                                        label={i18next.t("passwordForm")}
                                        placeholder={i18next.t("passwordPlaceholder")}
                                        value={this.state.password}
                                        onChange={this.handleChange}
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
                        ) : <Loading />
                    }

                    {user.token && <Redirect to="/" />}
                </div>
            </div>
        );
    }

    private handleChange = (property: string, value: string) => {
        this.setState((prevState: IState) => ({
            ...prevState,
            [property]: value
        }));
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
        user: state.user,
        requestingLogin: state.pendingRequests.loginRequested
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return bindActionCreators(userActions, dispatch);
}

export const LoginForm = connect(mapState, mapDispatch)(Login);
