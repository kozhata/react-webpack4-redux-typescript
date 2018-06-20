// React
import * as React from "react";
import { connect } from "react-redux";

// Utils
import * as authorActions from "../../actions/authorActions";

// Components
import SelectInput from "../common/selectInput";

// RxJs
import { Subscription } from "rxjs";

// Models
import { IManageCoursePageProps } from "../../models/models.d";

export class AuthorsSelectInput extends React.Component<IManageCoursePageProps> {
    private _subscription: Subscription;

    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount() {
        const self = this;

        self._subscription = self.props.loadAuthors().subscribe();
    }

    public componentWillUnmount() {
        const self = this;

        if (self._subscription) {
            self._subscription.unsubscribe();
            self._subscription = null;
        }
    }

    render() {
        const self = this;

        const { authors, value, onChange, error } = self.props;

        return (
            <SelectInput
                name="authorId"
                label="Author"
                value={value}
                defaultOption="Select Author"
                options={authors}
                onChange={onChange}
                error={error}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authors: state.authors.map(x => {
            return {
                value: x.id,
                key: x.id,
                text: x.firstName
            };
        }),
        ...ownProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAuthors: () => authorActions.loadAuthors(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorsSelectInput);
