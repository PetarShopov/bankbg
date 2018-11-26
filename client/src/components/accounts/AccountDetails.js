import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../../actions/accountActions';
import PropTypes from 'prop-types';
import React from 'react';


class AccountDetails extends React.Component {
    renderData() {
        return <div>{this.props.selectedAccount}</div>;
    }

    render() {
        return (
            <div className="">
                test
                {/* {this.props.selectedAccount ?
                    this.renderData()
                    :
                    <div className="">
                        No Data
                    </div>
                } */}
            </div>
        );
    }
}

AccountDetails.propTypes = {
    accountActions: PropTypes.object,
    selectedAccount: PropTypes.object
};

function mapStateToProps(state) {
    return {
        selectedAccount: state.selectedAccount
    };
}

function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(accountActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountDetails);