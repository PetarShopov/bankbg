import React from 'react'
import Input from '../core/forms/Input'

const TransferMoneyForm = (props) => (
    <form>
        <div>{props.error}</div>
        <Input
            name='receiverPin'
            type='text'
            placeholder='Receiver PIN'
            value={props.moneyTransfer.receiverPin}
            onChange={props.onChange}/>
        <br />
        <Input
            name='amount'
            type='number'
            placeholder='Amount'
            value={props.moneyTransfer.amount}
            onChange={props.onChange}/>
        <br />
        <input type="submit" onClick={props.onSave} />
    </form>
)

export default TransferMoneyForm