import DOMPurify from "dompurify";
import i18next from "i18next";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IStore } from "../../store/reducers/initialState";
import { Locale } from "../contracts";

interface IProps {
    locale: string;
    pages: any[];
}

class Advertisement extends React.PureComponent<IProps> {
    public render() {
        const pages = this.props.pages;

        const loading = pages.length > 0 ? false : true;

        const adContent = pages.find(this.findAdContent);

        const content = adContent
            ? adContent.content.rendered
            : "none";

        return (
            <aside className="announce mb-sm-5 mb-xs-5 p-0">
                <div className="card announce-card mx-md-3 mx-xl-0 rounded-0 ">
                    <div className="card-body px-3">
                        <p className="text-center">{i18next.t("latestMagazineAnnounce")}</p>

                        <small>
                            {loading ? (
                                <div className="announce-body" />
                            ) : content === "none" ? (
                                <div />
                            ) : (
                                        <span
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                                        />
                                    )}
                        </small>
                    </div>

                    {this.props.locale === Locale.RU && (
                        <div className="card-footer d-flex flex-row justify-content-center">
                            <Link to="/subscription">
                                <button
                                    className="btn btn-sm btn-warning shadowed m-auto rounded-0"
                                >
                                    {i18next.t("subscription")}
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        );
    }

    private findAdContent = (page: any) => page.title.rendered === "Уже в продаже";
}

function mapState(state: IStore, ownProps: any) {
    return {
        pages: state.pages,
        locale: state.language
    };
}

export const AdBlock = connect(mapState)(Advertisement);
