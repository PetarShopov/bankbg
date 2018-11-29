import React, { Component } from 'react'
import AuthService from '../../services/authService'
import { Link } from 'react-router-dom'
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
                <Link to='/' className='navbarLink'>Home</Link>
                {
                    AuthService.isUserAuthenticated() ? (
                        <span>
                            <Link to='/bankAccounts/add' className='navbarLink'>Add Bank Account</Link>
                            <Link to='/analytics' className='navbarLink'>Analytics</Link>
                            <span className='navbarLink' >{this.state.username}</span>
                            <Link to='/users/logout' className='navbarLink'>Logout</Link>
                        </span>
                    ) : (
                            <span>
                                <Link to='/users/register' className='navbarLink'>Register</Link>
                                <Link to='/users/login' className='navbarLink'>Login</Link>
                                <Link to='/accountDetails' className='navbarLink'>Account Details</Link>
                            </span>
                        )
                }
            </div>
        )
    }
}

export default Navbar