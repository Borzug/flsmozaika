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
    retrievePassword: (username: string) => void;
}

interface IState {
    username: string;
}

class RetrievePasswordForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = { username: "" };
    }

    public render() {
        return (
            <div className="card-body mx-auto">
                <div className="col-lg-8 col-xl-6 mx-auto mt-3">

                    <h5 className="text-center">{i18next.t("reset_password")}</h5>

                    <form className="mt-4" onSubmit={this.submit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="user_login"
                                name="user_login"
                                className="form-control"
                                onChange={this.handleChange}
                                required={true}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block rounded-0"
                            onClick={this.submit}
                        >
                            {i18next.t("send")}
                        </button>

                        <Link to="/signup">
                            <button className="btn btn-link btn-block" type="button">
                                <small className="text-muted">{i18next.t("registerButton")}</small>
                            </button>
                        </Link>

                    </form>

                    {this.props.user.token && <Redirect to="/" />}
                </div>
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(() => ({ username: e.target.value }));
    }

    private submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.retrievePassword(this.state.username);
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

export const RetrievePassword = connect(mapState, mapDispatch)(RetrievePasswordForm);
