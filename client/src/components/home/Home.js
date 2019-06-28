import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankAccountsActions from '../../actions/bankAccountsActions';
import PropTypes from 'prop-types';
import React from 'react';
import './Home.css';

class Home extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.props.bankAccountsActions.getAllBankAccounts(this.props.username)
        }
    }

    renderData() {
        return (
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
        )
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

Home.propTypes = {
    bankAccounts: PropTypes.array,
    bankAccountsActions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        bankAccounts: state.bankAccountsReducer.bankAccounts,
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
