import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankAccountsActions from '../../actions/bankAccountsActions';
import PropTypes from 'prop-types';
import React from 'react';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bankAccountsView: true
        }

        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        if (!this.props.isAdmin && this.props.username) {
            this.props.bankAccountsActions.getAllBankAccounts(this.props.username);
            this.props.bankAccountsActions.getAllCredits(this.props.username);
        }
    }

    changeView() {
        this.setState((state) => {
            return {
                bankAccountsView: !state.bankAccountsView
            }
        })
    }

    renderBankAccounts() {
        if (this.props.bankAccounts && this.props.bankAccounts.length > 0) {
            return (
                <>
                    <h2>Bank Accounts</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>PIN</th>
                                <th>Balance</th>
                                <th>Account ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.bankAccounts.map((account) =>
                                <tr key={account._id}>
                                    <td>{account.ownerFirstName}</td>
                                    <td>{account.ownerLastName}</td>
                                    <td>{account.ownerUsername}</td>
                                    <td>{account.ownerPin}</td>
                                    <td>{account.balance}</td>
                                    <td>{account._id}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </>
            )
        } else {
            return (
                <div>
                    No bank accounts
                </div>
            )
        }
    }

    renderCredits() {
        if (this.props.credits && this.props.credits.length > 0) {
            return (
                <>
                    <h2>Credits</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Owner Username</th>
                                <th>PIN</th>
                                <th>Amount</th>
                                <th>Approved</th>
                                <th>Created on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.credits.map((credit) =>
                                <tr key={credit._id}>
                                    <td>{credit.ownerUsername}</td>
                                    <td>{credit.pin}</td>
                                    <td>{credit.amount}</td>
                                    <td>{credit.approved ? 'Yes' : 'No'}</td>
                                    <td>{credit.createdOn}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </>
            )
        } else {
            return (
                <div>
                    No credits
                </div>
            )
        }
    }

    render() {
        if (!this.props.isLogged || this.props.isAdmin) {
            return (
                <h2>
                    Welcome To First Bulgarian Bank
                </h2>
            )
        }

        return (
            <div>
                <button onClick={this.changeView}>{this.state.bankAccountsView ? '-> to Credits' : '-> to Bank Accounts'}</button>
                {this.state.bankAccountsView ? this.renderBankAccounts() : this.renderCredits()}
            </div>
        );
    }
}

Home.propTypes = {
    bankAccounts: PropTypes.array,
    credits: PropTypes.array,
    username: PropTypes.string,
    isLogged: PropTypes.bool,
    isAdmin: PropTypes.bool,
    bankAccountsActions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        bankAccounts: state.bankAccountsReducer.bankAccounts,
        credits: state.bankAccountsReducer.credits,
        username: state.userReducer.username,
        isLogged: state.userReducer.username ? true : false,
        isAdmin: state.userReducer.role === 'Admin' ? true : false,
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
)(Home);
