import React, { Component } from 'react'
import TransferMoneyForm from './TransferMoneyForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormHelpers from '../core/forms/FormHelpers'
import * as bankAccountsActions from '../../actions/bankAccountsActions'
import PropTypes from 'prop-types';

class TransferMoneyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moneyTransfer: {
                receiverPin: '1234',
                amount: 700,
            },
            error: '',
        }
    }

    handleUserChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'moneyTransfer')
    }

    handleUserForm(event) {
        event.preventDefault()
        this.props.bankAccountsActions.transferMoney(this.state.moneyTransfer)
    }

    render() {
        return (
            <div>
                <h1>Transfer Money</h1>
                <TransferMoneyForm
                    moneyTransfer={this.state.moneyTransfer}
                    error={this.state.error}
                    onChange={this.handleUserChange.bind(this)}
                    onSave={this.handleUserForm.bind(this)} />
            </div>
        )
    }
}

TransferMoneyPage.propTypes = {
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
)(TransferMoneyPage);