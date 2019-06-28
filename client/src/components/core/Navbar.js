import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthService from '../../services/authService'
import { Link } from 'react-router-dom'
import './Navbar.css';

class Navbar extends Component {

    render() {
        let username = this.props.username;
        let isAdmin = this.props.role === 'Admin';
        return (
            <div className='menu'>
                <ul>
                    <li><Link to='/' className='navbarLink'>Home</Link></li>
                    {
                        AuthService.isUserAuthenticated() ? (
                            <span>
                                <li className="dropdown">
                                    <Link to='#' className='navbarLink'>Bank Accounts</Link>
                                    <div className="dropdown-content">
                                        <Link to='/bankAccounts/add' className='navbarLink'>Add</Link>
                                        <Link to='/bankAccounts/add' className='navbarLink'>Edit</Link>
                                        <Link to='/bankAccounts/add' className='navbarLink'>Delete</Link>
                                        <Link to='/bankAccounts/transferMoney' className='navbarLink'>Transfer Money</Link>
                                        <Link to='/credit/request' className='navbarLink'>Request Credit</Link>
                                    </div>
                                </li>
                                {isAdmin ? <li className="dropdown">
                                    <Link to='#' className='navbarLink'>Admin</Link>
                                    <div className="dropdown-content">
                                        <Link to='/credit/approve' className='navbarLink'>Approve credits</Link>
                                    </div>
                                </li> : null}
                                <li><Link to='/analytics' className='navbarLink'>Analytics</Link></li>
                                <li className="dropdown" id="userDetailsButton">
                                    <Link to='#' className='navbarLink' >{username}</Link>
                                    <div className="dropdown-content">
                                        <Link to='/users/logout' className='navbarLink'>Logout</Link>
                                    </div>
                                </li>
                            </span>
                        ) : (
                                <span>
                                    <li><Link to='/users/register' className='navbarLink'>Register</Link></li>
                                    <li><Link to='/users/login' className='navbarLink'>Login</Link></li>
                                </span>
                            )
                    }
                </ul>
            </div>
        )
    }
}

Navbar.propTypes = {
    username: PropTypes.string
};

function mapStateToProps(state) {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    };
}

export default connect(
    mapStateToProps,
    null
)(Navbar);
