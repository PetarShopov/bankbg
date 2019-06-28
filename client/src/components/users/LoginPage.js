import React, { Component } from 'react'
import LoginForm from './LoginForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormHelpers from '../core/forms/FormHelpers'
import * as userActions from '../../actions/UserActions'
import PropTypes from 'prop-types';

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: 'Admin', //'petar@bank.bg'
                password: '123456'
            },
            error: ''
        }
    }

    handleUserChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'user')
    }

    handleUserForm(event) {
        event.preventDefault()
        this.props.userActions.login(this.state.user)
    }

    render() {
        return (
            <div>
                <h1>Login Into Your Account</h1>
                <LoginForm
                    user={this.state.user}
                    error={this.state.error}
                    onChange={this.handleUserChange.bind(this)}
                    onSave={this.handleUserForm.bind(this)} />
            </div>
        )
    }
}

LoginPage.propTypes = {
    userActions: PropTypes.object,
    userLoggedIn: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(LoginPage);