import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../redux/reducer'
import axios from 'axios'
import './Components.scss'

const AuthModal = (props) => {
    const [usernameInput, setUsernameInput] = useState(''),
          [passInput, setPassInput] = useState('')

    const login = () => {
        axios.post('/api/login', {username: usernameInput, password: passInput})
        .then(res => {
            props.getUser(res.data)
            props.toggleFn()
        })
        .catch(err => console.log(err))
    }

    const register = () => {
        axios.post('/api/register', {username: usernameInput, password: passInput})
        .then(res => {
            props.getUser(res.data)
            props.toggleFn()
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='auth-modal-input'>
            <div className='test-2'>
            <input placeholder="Email" onChange={(e) => setUsernameInput(e.target.value)}/>
            <input placeholder="Password" onChange={(e) => setPassInput(e.target.value)} type='password'/>
            </div>

            <div className='auth-modal-btn'>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={props.toggleFn}>Cancel</button>
            </div>
        </div>
    )
}
export default connect(null, {getUser})(AuthModal)