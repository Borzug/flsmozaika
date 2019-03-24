import * as React from "react";
import { Locale } from "../contracts";

interface IProps {
    value: Locale;
    text?: string;
    changeLanguage: (lng: Locale) => void;
}

export class LanguageTrigger extends React.PureComponent<IProps> {
    public render() {
        return (
            <a className="page-link" href="#start" onClick={this.trigger}>
                {this.props.text
                    ? this.props.text
                    : this.props.value
                }
            </a>
        );
    }

    private trigger = () => {
        this.props.changeLanguage(this.props.value);
    }
}
