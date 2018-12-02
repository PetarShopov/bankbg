import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormHelpers from '../core/forms/FormHelpers'
import RegisterForm from './RegisterForm'
import * as userActions from '../../actions/UserActions'
import PropTypes from 'prop-types';

class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: 'test@test.com',
                password: '123456',
                confirmPassword: '123456',
                firstName: 'Test',
                lastName: 'Test2',
                pin: '1234'
            },
            submitted: false,
            error: ''
        }
    }

    handleUserChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'user')
    }

    handleUserForm(event) {
        event.preventDefault()
        if (!this.validateUser()) {
            return
        }
        this.setState({ submitted: true });
        this.props.userActions.register(this.state.user)
    }

    validateUser() {
        const user = this.state.user
        let formIsValid = true
        let error = ''

        if (user.password !== user.confirmPassword) {
            error = 'Password and confirmation password do not match'
            formIsValid = false
        }
        if (error) {
            this.setState({ error })
        }

        return formIsValid
    }

    render() {
        return (
            <div>
                <h1>Register User</h1>
                <RegisterForm
                    user={this.state.user}
                    error={this.state.error}
                    onChange={this.handleUserChange.bind(this)}
                    onSave={this.handleUserForm.bind(this)} />
            </div>
        )
    }
}

RegisterPage.propTypes = {
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
)(RegisterPage);