import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankAccountsActions from '../../actions/bankAccountsActions';
import PropTypes from 'prop-types';
import React from 'react';
import './Home.css';

class Home extends React.Component {
    componentDidMount() {
        this.props.bankAccountsActions.getAllBankAccounts()
    }

    renderData() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Balance</th>
                        <th>Account ID</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bankAccounts.map((account) =>
                        <tr key={account._id}>
                            <td>{account.ownerFirstName}</td>
                            <td>{account.ownerLastName}</td>
                            <td>{account.balance}</td>
                            <td>{account._id}</td>
                        </tr>)
                    }
                </tbody>
            </table>
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

Home.propTypes = {
    bankAccounts: PropTypes.array,
    bankAccountsActions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        bankAccounts: state.bankAccountsReducer.bankAccounts
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
