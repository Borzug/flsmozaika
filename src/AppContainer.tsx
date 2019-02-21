import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import { AdBlock } from "./components/common/AdBlock";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { SideMenu } from "./components/common/SideMenu";
import { LoginForm } from "./components/forms/LoginForm";
import { RetrievePassword } from "./components/forms/RetrievePassword";
import { Signup } from "./components/forms/SignupForm";
import { User } from "./components/forms/User";
import { Annotations } from "./components/pages/Annotations";
import { Posts } from "./components/pages/Posts";
import { StaticBodyPage } from "./components/pages/StaticBodyPage";
import { Post } from "./components/views/Post";
import { SearchResults } from "./components/views/SearchResults";
import { Cookie } from "./Cookie";
import { setLanguage } from "./store/actions/languageActions";
import { getUserData } from "./store/actions/userActions";
import { IStore } from "./store/reducers/initialState";

interface IProps {
    language: string;
    user: any;
    setLanguage: (lng: string) => void;
    getUserData: (token: string) => void;
}

class App extends React.Component<IProps> {
    private cookie: Cookie;

    constructor(props: IProps) {
        super(props);
        this.cookie = new Cookie();
    }

    public render() {
        return (
            <div id="start" className="app container-fluid">
                <div className="row">
                    <Header
                        changeLanguage={this.changeLanguage}
                        locale={this.props.language}
                        user={this.props.user}
                        getUserData={this.getUserData}
                    />

                    <SideMenu locale={this.props.language} />

                    <main className="p-0">
                        <Switch>
                            <Route path="/" exact={true} component={Posts} />
                            <Route path="/search" component={SearchResults} />
                            <Route path="/favorites" component={Annotations} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/retrieve_password" component={RetrievePassword} />
                            <Route path="/user" component={User} />
                            <Route path="/:path" exact={true} component={StaticBodyPage} />
                            <Route path="/news/archive" component={Post} />
                        </Switch>
                    </main>

                    <AdBlock locale={this.props.language} />

                    <Footer />
                </div>
            </div>
        );
    }

    private changeLanguage = (lng: string) => {
        this.props.setLanguage(lng);
        this.cookie.setCookie({
            name: "siteLocale",
            value: lng,
            options: { expires: 1000 * 60 * 60 * 24 * 365, path: "/" }
        });
    }

    private getUserData = () => {
        this.props.getUserData(this.props.user.token);
    }
}

function mapState(state: IStore, ownProps: any) {
    return {
        language: state.language,
        user: state.user
    };
}

function mapDispatch(dispatch: any) {
    return {
        setLanguage: bindActionCreators(setLanguage, dispatch),
        getUserData: bindActionCreators(getUserData, dispatch)
    };
}

export const AppContainer = withRouter(connect(mapState, mapDispatch)(App));
