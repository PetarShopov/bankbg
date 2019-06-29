import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormHelpers from '../core/forms/FormHelpers'
import * as bankAccountsActions from '../../actions/bankAccountsActions'
import PropTypes from 'prop-types';
import Input from '../core/forms/Input'

class RequestCreditPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            credit: {
                pin: 1234,
                amount: 700,
                ownerUsername: props.username
            },
            error: '',
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleUserChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'credit')
    }

    submit(event) {
        event.preventDefault()
        this.props.bankAccountsActions.requestCredit(this.state.credit)
    }

    render() {
        let {error, credit} = this.state;
        return (
            <div>
                <h1>Request Credit</h1>
                <form>
                    <div>{error}</div>
                    <Input
                        name='pin'
                        type='text'
                        placeholder='Your PIN '
                        value={credit.pin}
                        onChange={this.handleUserChange} />
                    <br />
                    <Input
                        name='amount'
                        type='text'
                        placeholder='Credit Amount '
                        value={credit.amount}
                        onChange={this.handleUserChange} />
                    <br />
                    <input type="submit" onClick={this.submit} />
                </form>
            </div>
        )
    }
}

RequestCreditPage.propTypes = {
    bankAccountsActions: PropTypes.object,
    credits: PropTypes.array
};

function mapStateToProps(state) {
    return {
        credits: state.bankAccountsReducer.credits,
        username: state.userReducer.username,
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
)(RequestCreditPage);