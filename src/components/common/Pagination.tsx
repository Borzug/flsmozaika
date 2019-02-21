import i18next from "i18next";
import * as React from "react";

import { PaginationLink } from "./PaginationLink";

const NUMBER_OF_BUTTONS = 5;

interface IProps {
    pagesCount: number;
    currentPage: number;
    changePage: (pageNumber: number) => void;
}

export class Pagination extends React.Component<IProps> {
    public render() {
        const { pagesCount, currentPage, changePage } = this.props;

        const paginationLength = pagesCount <= NUMBER_OF_BUTTONS ? pagesCount : NUMBER_OF_BUTTONS;

        const pages = Array.from({ length: paginationLength }, (_, idx) => {
            return this.getPaginationStart(pagesCount, currentPage, paginationLength) + idx;
        });

        const previous = currentPage > 1 ? currentPage - 1 : 1;
        const next = currentPage < pagesCount ? currentPage + 1 : pagesCount;
        const nextButtonClass = currentPage === pagesCount ? "page-item disabled" : "page-item";
        const previousButtonClass = currentPage === 1 ? "page-item disabled" : "page-item";

        return (
            <div>
                <nav aria-label="...">
                    <ul className="pagination pagination-sm justify-content-center">
                        <li className={previousButtonClass}>
                            <PaginationLink value={1} text={"<<"} changePage={changePage} />
                        </li>

                        <li className={previousButtonClass}>
                            <PaginationLink value={previous} text={i18next.t("previous")} changePage={changePage} />
                        </li>

                        {pages.map((page, idx) => (
                            <li key={idx} className={this.checkSelection(page)}>
                                <PaginationLink value={page} changePage={changePage} />
                            </li>
                        ))}

                        <li className={nextButtonClass}>
                            <PaginationLink value={next} text={i18next.t("next")} changePage={changePage} />
                        </li>

                        <li className={nextButtonClass}>
                            <PaginationLink value={pagesCount} text={">>"} changePage={changePage} />
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    private getPaginationStart = (count: number, current: number, paginationLength: number) => {
        if (current >= Math.ceil(NUMBER_OF_BUTTONS / 2) && current <= count - Math.floor(NUMBER_OF_BUTTONS / 2)) {
            return current - Math.floor(NUMBER_OF_BUTTONS / 2);
        }

        if (current < Math.ceil(NUMBER_OF_BUTTONS / 2)) {
            return 1;
        }

        if (current > count - Math.floor(NUMBER_OF_BUTTONS / 2)) {
            return count - paginationLength + 1;
        }

        return 1;
    }

    private checkSelection = (page: number) => {
        return this.props.currentPage === page ? "page-item active" : "page-item";
    }
}
