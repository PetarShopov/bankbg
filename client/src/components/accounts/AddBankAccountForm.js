import React from 'react'
import Input from '../core/forms/Input'

const AddBankAccountForm = (props) => (
    <form>
        <div>{props.error}</div>
        <Input
            name='ownerFirstName'
            type='text'
            placeholder='First Name'
            value={props.bankAccount.ownerFirstName}
            onChange={props.onChange}/>
        <br />
        <Input
            name='ownerLastName'
            type='text'
            placeholder='Last Name'
            value={props.bankAccount.ownerLastName}
            onChange={props.onChange}/>
        <br />
        <Input
            name='ownerUsername'
            type='text'
            placeholder='Username'
            value={props.bankAccount.ownerUsername}
            onChange={props.onChange}/>
        <br />
        <Input
            name='ownerPin'
            type='text'
            placeholder='PIN'
            value={props.bankAccount.ownerPin}
            onChange={props.onChange}/>
        <br />
        <Input
            name='balance'
            type='number'
            placeholder='Balance'
            value={props.bankAccount.balance}
            onChange={props.onChange}/>
        <br />
        <input type="submit" onClick={props.onSave} />
    </form>
)

export default AddBankAccountForm