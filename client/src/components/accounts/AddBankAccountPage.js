import React, { Component } from 'react'
import AddBankAccountForm from './AddBankAccountForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormHelpers from '../core/forms/FormHelpers'
import * as bankAccountsActions from '../../actions/bankAccountsActions'
import PropTypes from 'prop-types';

class AddBankAccountPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bankAccount: {
                ownerFirstName: 'Petar',
                ownerLastName: 'Shopov',
                ownerPin: '1234',
                balance: 100
            },
            error: ''
        }
    }

    handleUserChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'bankAccount')
    }

    handleUserForm(event) {
        event.preventDefault()
        this.props.bankAccountsActions.addBankAccount(this.state.bankAccount)
    }

    render() {
        return (
            <div>
                <h1>Add Bank Account</h1>
                <AddBankAccountForm
                    bankAccount={this.state.bankAccount}
                    error={this.state.error}
                    onChange={this.handleUserChange.bind(this)}
                    onSave={this.handleUserForm.bind(this)} />
            </div>
        )
    }
}

AddBankAccountPage.propTypes = {
    bankAccountsActions: PropTypes.object,
    bankAccounts: PropTypes.array
};

function mapStateToProps(state) {
    return {
        bankAccounts: state.bankAccounts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bankAccountsActions: bindActionCreators(bankAccountsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBankAccountPage);