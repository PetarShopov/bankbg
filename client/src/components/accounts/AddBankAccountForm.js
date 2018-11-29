import React from 'react'
import Input from '../core/forms/Input'

const AddBankAccountForm = (props) => (
    <form>
        <div>{props.error}</div>
        <Input
            name='ownerName'
            type='text'
            placeholder='Owner Name'
            value={props.bankAccount.ownerName}
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