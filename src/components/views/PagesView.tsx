import DOMPurify from "dompurify";
import i18next from "i18next";
import React from "react";
import { Link } from "react-router-dom";

import { router } from "../../appRouter";
import { ExcerptHighlight } from "../../ExcerptHighlight";
import { IPage } from "../contracts";

interface IProps {
    pages: IPage[];
    isSearch: boolean;
    query: string;
}

export const PagesView: React.SFC<IProps> = ({ pages, isSearch, query }) => {
    const pagePreformat = new ExcerptHighlight();

    return (
        <div>
            {isSearch &&
                <div>
                    <h5 className="mb-4">{i18next.t("found_pages")}:</h5>
                </div>
            }

            {pages && pages.length > 0 ?
                pages.map((entry, idx) => {
                    const content = query
                        ? "..." + pagePreformat.pageExcerptToShow(entry.content.rendered, query) + "..."
                        : "";

                    const pathname = (router as { [key: string]: string })[String(entry.id)];

                    return (
                        <div key={idx} className="card news rounded-0">
                            <div className="card-header my-auto">
                                <h5>
                                    {query
                                        ? (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(pagePreformat.highlightQuery(entry.title.rendered, query))
                                                }}
                                            />
                                        ) : entry.title.rendered
                                    }
                                </h5>
                            </div>

                            <div className="card-body">
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                                <p>
                                    <Link to={`/${pathname}`}>
                                        {i18next.t("go_to_page")}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    );
                }) :
                isSearch && <p className="mb-4">{i18next.t("not_found_pages")}.</p>
            }
        </div>
    );
};
