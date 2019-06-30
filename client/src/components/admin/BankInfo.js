import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankAccountsActions from '../../actions/bankAccountsActions';
import PropTypes from 'prop-types';
import React from 'react';
import './BankInfo.css';

class BankInfo extends React.Component {
    componentDidMount() {
        this.props.bankAccountsActions.getAllBankAccounts(null, true)
        this.props.bankAccountsActions.getAllCredits(null, true)
    }

    renderData() {
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
                    <tfoot>
                        <tr>
                            <th>Total Accounts</th>
                            <th>{this.props.bankInfo ? this.props.bankInfo.bankAccounts : null}</th>
                            <th></th>
                            <th>Total Balance</th>
                            <th>{this.props.bankInfo ? this.props.bankInfo.totalBalance : null}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <br/>
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
                    <tfoot>
                        <tr>
                            <th>Total Credits</th>
                            <th>{this.props.creditsInfo ? this.props.creditsInfo.credits : null}</th>
                            <th></th>
                            <th>Total Balance</th>
                            <th>{this.props.creditsInfo ? this.props.creditsInfo.totalBalance : null}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }

    render() {
        return (
            <div className="">
                {this.props.bankAccounts && this.props.bankAccounts.length > 0 ?
                    this.renderData()
                    :
                    <div className="">
                        No Data
                    </div>
                }
            </div>
        );
    }
}

BankInfo.propTypes = {
    bankAccounts: PropTypes.array,
    bankInfo: PropTypes.object,
    credits: PropTypes.array,
    creditsInfo: PropTypes.object,
    bankAccountsActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        bankAccounts: state.bankAccountsReducer.bankAccounts,
        bankInfo: state.bankAccountsReducer.bankInfo,
        credits: state.bankAccountsReducer.credits,
        creditsInfo: state.bankAccountsReducer.creditsInfo,
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
)(BankInfo);
