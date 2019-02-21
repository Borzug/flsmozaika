import * as React from "react";

interface IProps {
    value: number;
    text?: string | number;
    changePage: (pageNumber: number) => void;
}

export class PaginationLink extends React.PureComponent<IProps> {
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
        this.props.changePage(this.props.value);
    }
}
