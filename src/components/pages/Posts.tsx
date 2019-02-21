import i18next from "i18next";
import "moment/locale/ru";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as newsActions from "../../store/actions/newsActions";
import { INewsRequest } from "../../store/actions/newsActions";
import { IPendingRequests, IStore } from "../../store/reducers/initialState";
import { IPage } from "../contracts";
import { Loading } from "../views/Loading";
import { PostsView } from "../views/PostsView";

interface IProps {
    locale: string;
    loading: IPendingRequests;
    news: IPage[];
    newsPerPage: number;
    newsCount: number;
    currentPage: number;
    changePage: (pageNum: number) => void;
    getMoreNews: (request: INewsRequest) => void;
}

class PostsContainer extends React.Component<IProps> {
    public componentWillMount() {
        this.props.changePage(1);
    }

    public render() {
        const { loading, newsCount, news, newsPerPage, currentPage, locale } = this.props;

        return (
            <div>
                <h2 className="display-4 ml-3 my-3">{i18next.t("news")}</h2>
                <hr />

                {loading.newsRequested || loading.pagesRequested
                    ? <Loading />
                    : (
                        <div>
                            <PostsView
                                changePage={this.changePage}
                                news={news}
                                newsPerPage={newsPerPage}
                                newsCount={newsCount}
                                currentPage={currentPage}
                                locale={locale}
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    private changePage = (pageNumber: number) => {
        if (pageNumber > Math.ceil(this.props.news.length / this.props.newsPerPage)) {
            this.props.getMoreNews({ offset: this.props.news.length });
        }
        this.props.changePage(pageNumber);
    }
}

function mapState(state: IStore) {
    return {
        news: state.news,
        newsPerPage: state.newsPerPage,
        currentPage: state.currentPage,
        newsCount: state.newsCount,
        newsOffset: state.newsOffset,
        locale: state.language,
        loading: state.pendingRequests
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return bindActionCreators(newsActions, dispatch);
}

export const Posts = connect(mapState, mapDispatch)(PostsContainer);
