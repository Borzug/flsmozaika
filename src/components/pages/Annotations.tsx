import DOMPurify from "dompurify";
import { Location } from "history";
import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";

import { setLanguage } from "../../store/actions/languageActions";
import { changePage } from "../../store/actions/newsActions";
import { IPendingRequests, IStore } from "../../store/reducers/initialState";
import { Loading } from "../common/Loading";
import { IPage, Locale } from "../contracts";
import { NotFound } from "./NotFound";

interface IProps {
    locale: Locale;
    location: Location;
    pages: IPage[];
    currentPage: number;
    loading: IPendingRequests;
    changePage: (page: number) => void;
    setLanguage: (lng: Locale) => void;
}

class AnnotationsPage extends React.Component<IProps> {
    public componentWillMount() {
        const pageNumber = this.props.location.state.page === -1
            ? 1
            : this.props.pages.findIndex((page) => {
                return this.props.location.state.page === page.id;
            }) + 1;

        this.props.changePage(pageNumber);
    }

    public render() {
        const { pages, currentPage, loading } = this.props;

        const pageContent = pages.length > 0 ? pages[currentPage - 1].content.rendered : "none";

        return (
            <div>
                <h2 className="display-4 ml-3 my-3">{i18next.t("favorites")}</h2>
                <hr />

                <div className="card news border-0 rounded-0">
                    <div className="card-body">
                        <div className="mb-4">
                            <h5 className="d-inline">{i18next.t("choose_plan")}:</h5> &nbsp;&nbsp;&nbsp;
                            <select onChange={this.changePage} value={currentPage}>
                                {pages.map((entry, idx) => <option key={idx} value={idx + 1}>{entry.title.rendered}</option>)}
                            </select>
                        </div>

                        <hr />

                        <h5 className="my-4">{pages.length > 0 ? pages[currentPage - 1].title.rendered : ""}</h5>

                        {loading.archiveRequested
                            ? <Loading />
                            : pageContent === "none"
                                ? <NotFound locale={this.props.locale} changeLanguage={this.changeLanguage} />
                                : <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageContent) }} />
                        }
                    </div>
                </div>
            </div>
        );
    }

    private changePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.changePage(Number(e.target.value));
    }

    private changeLanguage = () => {
        this.props.setLanguage(Locale.RU);
    }
}

function mapState(state: IStore) {
    return {
        pages: state.favorites,
        currentPage: state.currentPage,
        loading: state.pendingRequests,
        locale: state.language
    };
}

function mapDispatch(dispatch: Dispatch<Action>) {
    return {
        changePage: bindActionCreators(changePage, dispatch),
        setLanguage: bindActionCreators(setLanguage, dispatch)
    };
}

const Annotations = connect(mapState, mapDispatch)(AnnotationsPage);

export { Annotations };
