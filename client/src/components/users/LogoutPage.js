import {Component} from 'react'
import authService from '../../services/authService'

class LogoutPage extends Component {
    componentWillMount () {
        authService.deauthenticateUser()
        authService.removeUser()
        this.props.history.push('/')
    }

    render() {
        return null
    }
}

export default LogoutPage