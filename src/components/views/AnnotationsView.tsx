import DOMPurify from "dompurify";
import i18next from "i18next";
import * as React from "react";
import { Link } from "react-router-dom";

import { ExcerptHighlight } from "../../ExcerptHighlight";
import { IPage } from "../contracts";

interface IProps {
    favorites: IPage[];
    isSearch: boolean;
    query: string;
}

export const AnnotationsView: React.SFC<IProps> = ({ favorites, isSearch, query }) => {
    const pagePreformat = new ExcerptHighlight();

    return (
        <div>
            {isSearch &&
                <div>
                    <hr className="my-5" />
                    <h5 className="mb-4">{i18next.t("found_favorites")}:</h5>
                </div>
            }

            {favorites && favorites.length > 0
                ? favorites.map((entry, idx) => {
                    const content = query
                        ? "..." + pagePreformat.pageExcerptToShow(entry.content.rendered, query) + "..."
                        : "";

                    return (
                        <div key={idx} className="card news rounded-0">
                            <div className="card-header my-auto">
                                <h5>
                                    {entry.title.rendered}
                                </h5>
                            </div>

                            <div className="card-body">
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

                                <p>
                                    <Link to={{ pathname: "/favorites", state: { page: entry.id } }}>
                                        {i18next.t("go_to_page")}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    );
                })
                : isSearch && <p className="mb-4">{i18next.t("not_found_pages")}.</p>
            }
        </div>
    );
};
