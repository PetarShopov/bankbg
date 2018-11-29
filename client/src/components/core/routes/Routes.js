import React from 'react'
import { Switch, Route } from 'react-router'
import PrivateRoute from './PrivateRoute'
import Home from '../../home/Home'
import AccountDetails from '../../accounts/AccountDetails'
import AddBankAccountPage from '../../accounts/AddBankAccountPage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'

const Routes = () => (
    <Switch>
        <Route path='/' exact component={Home} /> 
        <Route path='/accountDetails' component={AccountDetails} />
        <Route path='/users/register' component={RegisterPage} />
        <Route path='/users/login' component={LoginPage} />
        <PrivateRoute path='/bankAccounts/add' component={AddBankAccountPage} />
        <PrivateRoute path='/users/logout' component={LogoutPage} />
    </Switch>
)

export default Routes