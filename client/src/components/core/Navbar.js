import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthService from '../../services/authService'
import { Link } from 'react-router-dom'
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: AuthService.getUser().name
        }
    }

    // componentWillReceiveProps(props) {
    //     this.setState({
    //         username: AuthService.getUser().name
    //     })
    //     if (props.userReducer) {

    //     }
    // }

    render() {
        let username = this.state.username || this.props.username;
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
                                    </div>
                                </li>
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
        username: state.userReducer.username
    };
}

export default connect(
    mapStateToProps,
    null
)(Navbar);
