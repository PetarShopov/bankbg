import {Component} from 'react'
import * as userActions from '../../actions/UserActions'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LogoutPage extends Component {
    componentWillMount () {
        this.props.userActions.logout()
    }

    render() {
        return null
    }
}

LogoutPage.propTypes = {
    userActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(LogoutPage);