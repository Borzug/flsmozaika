import i18next from "i18next";
import * as React from "react";

import loading from "../../assets/loading.gif";

export class Loading extends React.Component {
    public render() {
        return (
            <div>
                <div className="row">
                    <h2 className="mx-auto p-3">{i18next.t("loading")}</h2>
                </div>

                <div className="row mb-4">
                    <img className="img-fluid mx-auto" src={loading} alt="notfound" /><br />
                </div>
            </div>
        );
    }
}
