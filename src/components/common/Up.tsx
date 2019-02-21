import * as React from "react";

import up from "../../assets/arrow-with-circle-up.svg";

export const Up: React.SFC = () => {
    return (
        <div className="up-arrow d-none">
            <a className="nav-link my-0 text-centered" href="#start">
                <img src={up} width="30px" alt="up-arrow" />
            </a>
        </div>
    );
};
