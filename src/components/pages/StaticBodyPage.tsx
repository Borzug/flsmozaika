import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { match } from "react-router";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as languageActions from "../../store/actions/languageActions";
import { IPendingRequests, IStore } from "../../store/reducers/initialState";
import { IPage } from "../contracts";
import { Static } from "../views/Static";

interface IProps {
    locale: string;
    pages: IPage[];
    loading: IPendingRequests;
    setLanguage: any;
    match: match<any>;
}

class StaticPage extends React.PureComponent<IProps> {
    public render() {
        const location = this.props.match.params.path;
        const { pages, loading, locale } = this.props;

        const page = pages.find(this.findContent);

        const content = page
            ? page.content.rendered
            : "none";

        return (
            <Static
                pageContent={content}
                name={location}
                locale={locale}
                loading={loading.pagesRequested}
            />
        );
    }

    private findContent = (page: any) => page.title.rendered === i18next.t(this.props.match.params.path);
}

function mapState(state: IStore) {
    return {
        locale: state.language,
        pages: state.pages,
        loading: state.pendingRequests
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return bindActionCreators(languageActions, dispatch);
}

const StaticBodyPage = connect(mapState, mapDispatch)(StaticPage);

export { StaticBodyPage };
