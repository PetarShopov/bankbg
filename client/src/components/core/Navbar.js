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
                        <div>
                            <Link to='/products/add' className='navbarLink'>Add</Link>
                            <Link to='/analytics' className='navbarLink'>Analytics</Link>
                            <span className='navbarLink' >{this.state.username}</span>
                            <Link to='/users/logout' className='navbarLink'>Logout</Link>
                        </div>
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