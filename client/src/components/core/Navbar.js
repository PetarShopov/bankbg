import React, { Component } from 'react'
import AuthService from '../../services/authService'
import { Link } from 'react-router-dom'
import './Navbar.css';
// import userStore from '../../stores/UserStore'

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: AuthService.getUser().name
        }
    }

    render() {
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
                                    </div>
                                </li>
                                <li><Link to='/analytics' className='navbarLink'>Analytics</Link></li>
                                <li className="dropdown" id="userDetailsButton">
                                    <Link to='#' className='navbarLink' >{this.state.username}</Link>
                                    <div className="dropdown-content">
                                        <Link to='/users/logout' className='navbarLink'>Logout</Link>
                                    </div>
                                </li>
                            </span>
                        ) : (
                                <span>
                                    <li><Link to='/users/register' className='navbarLink'>Register</Link></li>
                                    <li><Link to='/users/login' className='navbarLink'>Login</Link></li>
                                    <li><Link to='/accountDetails' className='navbarLink'>Account Details</Link></li>
                                </span>
                            )
                    }
                </ul>
            </div>
        )
    }
}

export default Navbar
