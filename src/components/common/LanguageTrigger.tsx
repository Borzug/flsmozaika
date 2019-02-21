import * as React from "react";

interface IProps {
    value: string;
    text?: string;
    changeLanguage: (lng: string) => void;
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
