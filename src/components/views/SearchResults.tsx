import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";

import * as newsActions from "../../store/actions/newsActions";
import { IPendingRequests, ISearchData, IStore } from "../../store/reducers/initialState";
import { AnnotationsView } from "./AnnotationsView";
import { Loading } from "./Loading";
import { PagesView } from "./PagesView";
import { PostsView } from "./PostsView";

interface IProps {
    search: ISearchData;
    newsPerPage: number;
    currentPage: number;
    locale: string;
    loading: IPendingRequests;
    getMoreNews: (request: newsActions.INewsRequest) => void;
    changePage: (pageNumber: number) => void;
}

class SearchResultsBlock extends React.Component<IProps> {
    public render() {
        const { locale, search, newsPerPage, currentPage, loading } = this.props;

        return (
            <div>
                <h2 className="display-4 ml-3 my-3">{i18next.t("found")}</h2>
                <hr />

                {
                    loading.newsRequested || loading.pagesRequested ?
                        <Loading /> :

                        <div className="card-body">

                            <div className="mb-5">
                                <h5>{i18next.t("searched_for")}: "<span className="search-query">{search.query}</span>"</h5>
                            </div>

                            <PagesView
                                pages={search.pages}
                                isSearch={true}
                                query={search.query}
                            />

                            <PostsView
                                news={search.news}
                                changePage={this.changePage}
                                currentPage={currentPage}
                                newsPerPage={newsPerPage}
                                newsCount={search.news.length}
                                isSearch={true}
                                query={search.query}
                                locale={locale}
                            />

                            <AnnotationsView
                                favorites={search.favorites}
                                isSearch={true}
                                query={search.query}
                            />
                        </div>
                }
            </div>
        );
    }

    private changePage = (pageNumber: number) => {
        if (pageNumber > Math.ceil(this.props.search.news.length / this.props.newsPerPage)) {
            this.props.getMoreNews({
                offset: this.props.search.news.length,
                perPage: 100,
                search: this.props.search.query
            });
        }

        this.props.changePage(pageNumber);
    }
}

function mapState(state: IStore) {
    return {
        newsPerPage: state.newsPerPage,
        currentPage: state.currentPage,
        loading: state.pendingRequests,
        search: state.search,
        locale: state.language
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return bindActionCreators(newsActions, dispatch);
}

export const SearchResults = connect(mapState, mapDispatch)(SearchResultsBlock);
