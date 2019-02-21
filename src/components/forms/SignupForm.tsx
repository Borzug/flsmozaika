import classNames from "classnames";
import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as userActions from "../../store/actions/userActions";
import { IStore, IUserData, IUserProfile } from "../../store/reducers/initialState";
import { Validation } from "../../utils/Validation";
import { FormFields } from "../contracts";
import { TextInput } from "./TextInput";

interface IProps {
    user: IUserData;
    clearSignupData: () => void;
    signup: (request: IUserProfile) => void;
}

interface IState {
    username: string;
    password: string;
    confirm_password: string;
    name: string;
    email: string;
    employment: string;
    meta: {
        subscriber: boolean
    };
    sent: boolean;
}

class SignupForm extends React.Component<IProps, IState> {
    private validation: Validation;

    constructor(props: IProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            name: "",
            email: "",
            employment: "",
            meta: {
                subscriber: true
            },
            sent: false
        };

        this.validation = new Validation();
    }

    public componentWillUnmount() {
        this.props.clearSignupData();
    }

    public render() {
        const passwordClass = classNames(
            {
                "is-invalid": !this.validation.validate(
                    [this.validation.minLength(this.state.password, 4)]
                ) && (this.state.password.length > 0 || this.state.sent)
            }
        );

        const confirmPasswordClass = classNames(
            {
                "is-invalid": !this.validation.validate(
                    [
                        this.validation.minLength(this.state.password, 4),
                        this.validation.equality([this.state.password, this.state.confirm_password])
                    ]
                ) && (this.state.confirm_password.length > 0 || this.state.sent)
            }
        );

        return (
            <div className="card-body mx-auto mt-3">
                <div className="text-center">
                    <h5>{i18next.t("fillFormSuggestion")}:</h5>
                    <small className="text-muted mx-auto">{i18next.t("noticeRequired")}</small>
                </div>

                <form id="needs-validation" className="mt-4 mx-auto" onSubmit={this.submit} noValidate={true}>
                    <div className="form-group row">
                        <TextInput
                            inputSizeClassName="col-sm-7"
                            labelClassName="col-sm-4 col-form-label text-right"
                            type="text"
                            name={FormFields.Username}
                            label={<span><span className="text-danger">*</span> {i18next.t("usernameForm")}</span>}
                            placeholder={i18next.t("usernamePlaceholder")}
                            value={this.state.username}
                            onChange={this.handleChange}
                            required={true}
                        />
                    </div>

                    <div className="form-group row">
                        <TextInput
                            inputSizeClassName="col-sm-7"
                            validationClassName={passwordClass}
                            labelClassName="col-sm-4 col-form-label text-right"
                            type="password"
                            name={FormFields.Password}
                            label={<span><span className="text-danger">*</span> {i18next.t("passwordForm")}</span>}
                            placeholder={i18next.t("passwordPlaceholder")}
                            value={this.state.password}
                            onChange={this.handleChange}
                            helper={<small className="form-text text-muted">{i18next.t("signup_form_password_helper")}</small>}
                            required={true}
                        />
                    </div>

                    <div className="form-group row">
                        <TextInput
                            inputSizeClassName="col-sm-7"
                            validationClassName={confirmPasswordClass}
                            labelClassName="col-sm-4 col-form-label text-right"
                            type="password"
                            name={FormFields.Confirm}
                            label={<span><span className="text-danger">*</span> {i18next.t("passwordConfirmForm")}</span>}
                            placeholder={i18next.t("passwordConfirmPlaceholder")}
                            value={this.state.confirm_password}
                            onChange={this.handleChange}
                            helper={<small className="form-text text-muted">{i18next.t("passwords_should_match")}</small>}
                            required={true}
                        />

                        <div className="invalid-feedback">
                            {i18next.t("passwords_should_match")}
                        </div>
                    </div>

                    <div className="form-group row">
                        <TextInput
                            inputSizeClassName="col-sm-7"
                            labelClassName="col-sm-4 col-form-label text-right"
                            type="email"
                            name={FormFields.Email}
                            label={<span><span className="text-danger">*</span> {i18next.t("emailForm")}</span>}
                            placeholder={i18next.t("emailPlaceholder")}
                            value={this.state.email}
                            onChange={this.handleChange}
                            required={true}
                        />
                    </div>

                    <div className="form-group row">
                        <TextInput
                            inputSizeClassName="col-sm-7"
                            labelClassName="col-sm-4 col-form-label text-right"
                            type="text"
                            name={FormFields.Name}
                            label={<span><span className="text-danger">*</span> {i18next.t("nameForm")}</span>}
                            placeholder={i18next.t("namePlaceholder")}
                            value={this.state.name}
                            onChange={this.handleChange}
                            required={true}
                        />
                    </div>

                    <div className="form-group row">
                        <TextInput
                            inputSizeClassName="col-sm-7"
                            labelClassName="col-sm-4 col-form-label text-right"
                            type="text"
                            name={FormFields.Employment}
                            label={<span><span className="text-danger">*</span> {i18next.t("jobForm")}</span>}
                            placeholder={i18next.t("jobPlaceholder")}
                            value={this.state.employment}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group row">
                        <div className="mx-auto mt-4">
                            <button type="submit" className="btn btn-primary btn-block rounded-0">
                                {i18next.t("register")}
                            </button>
                        </div>
                    </div>
                </form>

                {this.props.user.registeredOnThisSession && <Redirect to="/login" />}
            </div>
        );
    }

    private handleChange = (property: string, value: string) => {
        this.setState((prevState: IState) => ({
            ...prevState,
            [property]: value
        }));
    }

    private submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.setState({ sent: true });

        const isPasswordValidated = this.state.password.length > 3 && this.state.password === this.state.confirm_password;

        if (isPasswordValidated) {
            this.props.signup(this.state);
        }
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

export const Signup = connect(mapState, mapDispatch)(SignupForm);
