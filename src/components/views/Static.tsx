import DOMPurify from "dompurify";
import i18next from "i18next";
import React from "react";
import { Redirect } from "react-router";

import { Loading } from "./Loading";

interface IProps {
    locale: string;
    loading: boolean;
    pageContent: string;
    name: string;
}

export const Static: React.SFC<IProps> = ({ loading, pageContent, name }) => {
    return (
        <div>
            <h2 className="display-4 ml-3 my-3">{i18next.t(name)}</h2>

            <hr />

            <div className="card news border-0 rounded-0">
                <div className="card-body">

                    {loading
                        ? (
                            <Loading />
                        ) : pageContent === "none"
                            ? <Redirect to="/" />
                            : <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageContent) }} />
                    }

                </div>
            </div>
        </div>
    );
};
