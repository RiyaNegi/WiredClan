import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as authActions from "../../actions/authActions";
class Signout extends PureComponent {

    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <div>Sorry to see you go ...</div>
        )
    }
}

export default connect(null, authActions)(Signout);
