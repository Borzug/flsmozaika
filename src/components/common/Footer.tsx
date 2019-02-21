import * as React from "react";

import { Up } from "./Up";

export const Footer: React.SFC = () => {
    return (
        <div>
            <nav className="navbar-bottom navbar navbar-expand fixed-bottom navbar-light bg-light border">
                <div className="mr-auto">
                    <Up />
                </div>
            </nav>
        </div>
    );
};
