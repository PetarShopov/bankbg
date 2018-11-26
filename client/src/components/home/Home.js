import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankAccountsActions from '../../actions/bankAccountsActions';
import PropTypes from 'prop-types';
import React from 'react';


class Home extends React.Component {
    renderData() {
        return <div>{this.props.bankAccounts.map(account => <div>{account._id}</div>)}</div>;
    }

    getAllBankAccounts = (event) => {
        this.props.bankAccountsActions.getAllBankAccounts();
    }

    addBankAccount = (event) => {
        let bankAccount = {
            ownerId: '123',
            ownerName: 'Petar Shopov',
            balance: 100,
            balanceMovements: [100],
            createdOn: Date.now(),
            lastChange: Date.now()
        }
        this.props.bankAccountsActions.addBankAccount(bankAccount);
    }

    render() {
        return (
            <div className="">
                {this.props.bankAccounts.length > 0 ?
                    this.renderData()
                    :
                    <div className="">
                        No Data
            </div>
                }
                <button onClick={this.getAllBankAccounts.bind(this)}>Get Data</button>
                <button onClick={this.addBankAccount.bind(this)}>Add Data</button>
            </div>
        );
    }
}

Home.propTypes = {
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
)(Home);