import DOMPurify from "dompurify";
import i18next from "i18next";
import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";

import { ExcerptHighlight } from "../../ExcerptHighlight";
import { Pagination } from "../common/Pagination";
import { IPage } from "../contracts";

interface IProps {
    locale: string;
    news: IPage[];
    currentPage: number;
    newsPerPage: number;
    newsCount: number;
    isSearch?: boolean;
    query?: string;
    changePage: (pageNumber: number) => void;
}

export const PostsView: React.SFC<IProps> = ({
    changePage,
    news,
    currentPage,
    newsPerPage,
    newsCount,
    isSearch,
    query,
    locale
}) => {
    moment.locale(locale);
    const pagePreformat = new ExcerptHighlight();
    const pageStart = (currentPage - 1) * newsPerPage;
    const pageEnd = pageStart + newsPerPage;

    return (
        <div>
            {isSearch &&
                <div>
                    <hr className="my-5" />
                    <h5 className="mb-4" >{i18next.t("found_news")}:</h5>
                </div>
            }

            {news.length > 0 ?
                news.slice(pageStart, pageEnd).map((entry, idx) => {
                    const content = query ?
                        "..." + pagePreformat.pageExcerptToShow(entry.content.rendered, query) + "..." :
                        entry.content.rendered;

                    return (
                        <div key={idx} className="card news bg-light rounded-0">
                            <div className="card-header">
                                <div className="row">
                                    <strong className="col-xs-9 col-sm-9">
                                        {query
                                            ? (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(pagePreformat.highlightQuery(entry.title.rendered, query))
                                                    }}
                                                />
                                            ) : entry.title.rendered
                                        }
                                    </strong>

                                    <small className="text-muted col-xs-3 col-sm-3 text-right align-tex-bottom my-auto">
                                        {moment(entry.date).format("lll")}
                                    </small>
                                </div>
                            </div>

                            <div className="card-body">
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

                                {isSearch &&
                                    <p>
                                        <Link to={{ pathname: "/news/archive", state: { id: entry.id } }}>
                                            {i18next.t("go_to_page")}
                                        </Link>
                                    </p>
                                }
                            </div>
                        </div>
                    );
                }) :
                <p className="mb-4">{i18next.t("not_found_news")}.</p>
            }

            {newsPerPage < newsCount &&
                <Pagination pagesCount={Math.ceil(newsCount / newsPerPage)} currentPage={currentPage} changePage={changePage} />
            }
        </div>
    );
};
