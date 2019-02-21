import DOMPurify from "dompurify";
import { Location } from "history";
import i18next from "i18next";
import moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { IStore } from "../../store/reducers/initialState";
import { IPage } from "../contracts";

interface IProps {
    locale: string;
    location: Location;
    news: IPage[];
}

interface IState {
    entry?: IPage;
}

class PostMessage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const entry = this.props.news.find((element) => {
            return element.id === this.props.location.state.id;
        });

        this.state = { entry };
    }

    public render() {
        moment.locale(this.props.locale);

        return (
            <div>
                {this.state.entry &&
                    <>
                        <h2 className="display-4 ml-3 my-3">{i18next.t("found")}</h2>
                        <hr />

                        <div className="card news bg-light rounded-0">
                            <div className="card-header">
                                <div className="row">
                                    <strong className="col-xs-8 col-sm-8">
                                        {this.state.entry.title.rendered}
                                    </strong>

                                    <small className="text-muted col-xs-4 col-sm-4 text-right align-tex-bottom my-auto">
                                        {moment(this.state.entry.date).format("lll")}
                                    </small>
                                </div>
                            </div>

                            <div className="card-body">
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.entry.content.rendered) }} />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mb-4">
                            <Link to="/search" className="btn btn-outline-secondary btn-sm shadowed rounded-0">
                                {i18next.t("back")}
                            </Link>
                        </div>
                    </>
                }
            </div>
        );
    }
}

function mapState(state: IStore) {
    return {
        news: state.search.news,
        locale: state.language
    };
}

export const Post = connect(mapState)(PostMessage);
