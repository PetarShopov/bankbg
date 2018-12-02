import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankAccountsActions from '../../actions/bankAccountsActions';
import PropTypes from 'prop-types';
import React from 'react';


class Home extends React.Component {
    componentDidMount() {
        this.props.bankAccountsActions.getAllBankAccounts()
    }

    renderData() {
        return <div>{this.props.bankAccounts.map(account => <div key={account._id}>{account._id}</div>)}</div>;
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
    bankAccountsActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        bankAccountsActions: bindActionCreators(bankAccountsActions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Home);
