import { History, Location } from "history";
import * as React from "react";
import { match, withRouter } from "react-router";

interface IProps {
    location: Location;
    history: History;
    match: match;
}

class AppNavigatorLayout extends React.Component<IProps> {
    public componentDidUpdate(prevProps: IProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    public render() {
        return this.props.children;
    }
}

export const ScrollOnLocationChange = withRouter(AppNavigatorLayout);
