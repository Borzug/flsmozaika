import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as userActions from "../../store/actions/userActions";
import { IStore, IUserData, IUserProfile } from "../../store/reducers/initialState";
import { FormFields } from "../contracts";
import { Loading } from "../views/Loading";
import { TextInput } from "./TextInput";

interface IProps {
    user: IUserData;
    loggedOut: () => void;
    handleUserDataChange: (user: IUserProfile) => void;
    updateUser: (userData: IUserProfile, token: string) => void;
}

class UserForm extends React.Component<IProps> {
    public render() {
        const { user } = this.props;

        const isAdmin = user && user.profile.roles && user.profile.roles.indexOf("administrator") >= 0
            ? true
            : false;

        return (
            <div>
                <h2 className="display-4 ml-3 my-3">{i18next.t("cabinet")}</h2>
                <hr />

                <div className="card news border-0 rounded-0">
                    <div className="card-body">

                        {isAdmin &&
                            <a role="button" className="btn btn-block btn-info rounded-0 shadowed mb-4" href="/wp-admin/index.php">
                                Управление сайтом
                            </a>
                        }

                        {user.userFormData.nickname
                            ? (
                                <form onSubmit={this.submit} className="mb-5">
                                    <div className="form-group row">
                                        <TextInput
                                            inputSizeClassName="col-md-8 col-lg-9"
                                            labelClassName="col-md-4 col-lg-3 col-form-label"
                                            type="text"
                                            name={FormFields.Username}
                                            label={i18next.t("profile_user")}
                                            value={user.userFormData.nickname}
                                            onChange={this.handleChange}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="form-group row">
                                        <TextInput
                                            inputSizeClassName="col-md-8 col-lg-9"
                                            labelClassName="col-md-4 col-lg-3 col-form-label"
                                            type="text"
                                            name={FormFields.Nickname}
                                            label={i18next.t("profile_nickname")}
                                            value={user.userFormData.nickname}
                                            onChange={this.handleChange}
                                            required={true}
                                        />
                                    </div>

                                    <div className="form-group row">
                                        <TextInput
                                            inputSizeClassName="col-md-8 col-lg-9"
                                            labelClassName="col-md-4 col-lg-3 col-form-label"
                                            type="text"
                                            name={FormFields.Name}
                                            label={i18next.t("profile_name")}
                                            value={user.userFormData.name}
                                            onChange={this.handleChange}
                                            required={true}
                                        />
                                    </div>

                                    <div className="form-group row">
                                        <TextInput
                                            inputSizeClassName="col-md-8 col-lg-9"
                                            labelClassName="col-md-4 col-lg-3 col-form-label"
                                            type="email"
                                            name={FormFields.Email}
                                            label="Email"
                                            value={user.userFormData.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-group row">
                                        <TextInput
                                            inputSizeClassName="col-md-8 col-lg-9"
                                            labelClassName="col-md-4 col-lg-3 col-form-label"
                                            type="text"
                                            name={FormFields.Description}
                                            label={i18next.t("profile_employment")}
                                            value={user.userFormData.description}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-check">
                                        <label className="custom-control custom-checkbox mt-3 mb-4">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                onChange={this.handleCheck}
                                                value={user.userFormData.meta && user.userFormData.meta.subscriber}
                                                defaultChecked={user.userFormData.meta && user.userFormData.meta.subscriber}
                                            />
                                            <span className="custom-control-indicator" />
                                            <span className="custom-control-description ml-2">{i18next.t("user_profile_want_notification")}</span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-outline-info rounded-0 shadowed float-left"
                                    >
                                        {i18next.t("profile_save_changes_button")}
                                    </button>
                                    <button
                                        className="btn btn-outline-danger rounded-0 shadowed float-right"
                                        onClick={this.logOut}
                                    >
                                        {i18next.t("exitButton")}
                                    </button>
                                </form>
                            ) : <Loading />
                        }

                        {!user.token && <Redirect to="/" />}
                    </div>
                </div>
            </div>
        );
    }

    private logOut = () => {
        this.props.loggedOut();
    }

    private handleCheck = () => {
        const editedUser = Object.assign(
            {},
            this.props.user.userFormData,
            {
                meta: {
                    subscriber: !this.props.user.userFormData.meta.subscriber
                }
            }
        );

        this.props.handleUserDataChange(editedUser);
    }

    private handleChange = (name: string, value: string) => {
        const editedUser = Object.assign({}, this.props.user.userFormData, { [name]: value });
        this.props.handleUserDataChange(editedUser);
    }

    private submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.updateUser(this.props.user.userFormData, this.props.user.token);
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

export const User = connect(mapState, mapDispatch)(UserForm);
