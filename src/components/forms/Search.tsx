import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Action, bindActionCreators, Dispatch } from "redux";

import { parentIDs } from "../../appRouter";
import glass from "../../assets/magnifying-glass.svg";
import * as newsActions from "../../store/actions/newsActions";
import * as pagesActions from "../../store/actions/pagesActions";
import * as searchActions from "../../store/actions/searchActions";
import { IStore } from "../../store/reducers/initialState";
import { Locale } from "../contracts";

interface IProps {
    locale: string;
    newsPerPage: number;
    news: {
        getNews: (request: newsActions.INewsRequest) => void;
        changePage: (pageNumber: number) => void;
    };
    pages: {
        getPages: (request: pagesActions.IPagesRequest) => void;
        getFavorites: (query: string) => void;
    };
    search: {
        clearSearch: () => void;
        setSearch: (query: string) => void;
    };
}

interface IState {
    value: string;
    fireRedirect: boolean;
}

class SearchContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: "",
            fireRedirect: false
        };
    }

    public render() {
        const isSearchActive = this.state.value.trim().length > 0 ? "" : "disabled";

        return (
            <div>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.search}>
                    <input
                        className="search-form form-control-sm mr-1"
                        type="search"
                        placeholder={i18next.t("searchPlaceholder")}
                        aria-label="Search"
                        onChange={this.handleChange}
                        value={this.state.value}
                    />

                    <Link
                        to="/search"
                        className={`btn btn-success btn-sm my-xs-2 my-sm-0 shadowed rounded-0 ${isSearchActive}`}
                        onClick={this.search}
                        role="button"
                    >
                        <img src={glass} width="20" alt="поиск" />
                    </Link>
                </form>

                {this.state.fireRedirect && <Redirect to="/search" />}
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.setState(() => ({
            value,
            fireRedirect: false
        }));
    }

    private search = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const query = this.state.value.trim();
        const parentExclude = this.props.locale === Locale.RU
            ? `${parentIDs.englishArticles},${parentIDs.archiveArticles}`
            : `${parentIDs.russianArticles},${parentIDs.archiveArticles}`;

        if (query.length > 0) {
            this.setState({ fireRedirect: true });
            this.props.search.clearSearch();
            this.props.search.setSearch(query);
            this.props.news.getNews({ perPage: 100, page: 1, search: this.state.value });
            this.props.pages.getPages({ parentExclude, exclude: parentIDs.announcePage, search: this.state.value });
            this.props.pages.getFavorites(this.state.value);
            this.props.news.changePage(1);
            this.setState({ value: "" });
        }
    }
}

function mapState(state: IStore) {
    return {
        newsPerPage: state.newsPerPage,
        locale: state.language
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return {
        news: bindActionCreators(newsActions, dispatch),
        pages: bindActionCreators(pagesActions, dispatch),
        search: bindActionCreators(searchActions, dispatch)
    };
}

export const Search = connect(mapState, mapDispatch)(SearchContainer);
