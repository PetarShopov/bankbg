import React from 'react'
import Input from '../core/forms/Input'

const LoginForm = (props) => (
    <form>
        <div>{props.error}</div>
        <Input
            name='username'
            type='email'
            placeholder='Email'
            value={props.user.username}
            onChange={props.onChange}/>
        <br />
        <Input
            name='password'
            type='password'
            placeholder='Password'
            value={props.user.password}
            onChange={props.onChange}/>
        <br />
        <input type="submit" onClick={props.onSave} />
    </form>
)

export default LoginForm