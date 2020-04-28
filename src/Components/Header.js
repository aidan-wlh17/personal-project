import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../redux/reducer'
import axios from 'axios'
import './Components.scss'

const Header = (props) => {
    console.log(props)
    const [usernameInput, setUsernameInput] = useState(''),
          [passInput, setPassInput] = useState('')

    const login = () => {
        axios.post('/api/login', {username: usernameInput, password: passInput})
        .then(res => {
            props.getUser(res.data)
        })
        .catch(err => console.log(err))
    }

    const register = () => {
        axios.post('/api/register', {username: usernameInput, password: passInput})
        .then(res => {
            props.getUser(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='header'>
            
            <img src='https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519561-057_CircledArrowLeft-512.png' alt='back'/>

            <div className='nav-links'>

            <Link to='/'>
            <img src='https://cdn4.iconfinder.com/data/icons/rock-music-instruments/154/acoustic-guitar-music-round-512.png' alt='home-btn'/>
            </Link>
            
            <div className='login-register'>
                <div className='inputs'>
                    <input placeholder='Email'/>
                    <input placeholder='Password' type='password'/>
                </div>

                <div className='btns'>
                    <button onClick={() => login()}>Login</button>
                    <button onClick={() => register()}>Register</button>
                </div>
            </div>
                
            <div className='icons'>
            <Link className='links' to='/profile'>
                <img src='https://cdn4.iconfinder.com/data/icons/game-10/22/player-profile-512.png' alt='profile' className='icons-img'/>
            </Link>
            </div>

            <div className='icons'>
            <Link className='links' to='/cart'>
                <img src='https://cdn0.iconfinder.com/data/icons/typicons-2/24/shopping-cart-512.png' alt='cart' className='icons-img'/>
            </Link>
            </div>

            </div>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState

export default connect(null, {getUser})(Header)