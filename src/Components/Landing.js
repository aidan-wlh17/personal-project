import React from 'react'
import {Link} from 'react-router-dom'
import './Components.scss'

const Landing = () => {
    return (
        <div className='landing'>


        <div className='categories'>

            <div className='category'>
            <h2 className='category-h2'>Guitars</h2>
            <div className='category-box'> 
                <Link to='/guitars'>
                <img src='https://cdn3.iconfinder.com/data/icons/simple-transparent-guitars/100/Gibson_ES-335-512.png' alt='Guitars' className='category-img'/>
                </Link>
            </div>
            </div>

            <div className='category'>
            <h2 className='category-h2'>Amp's & Speakers</h2>
            <div className='category-box'>
                <Link to='/amps-speakers'>
                <img src='https://cdn1.iconfinder.com/data/icons/music-festival-6/64/speaker-audio-amplifier-512.png' alt='Amplifiers and Speakers' className='category-img'/>
                </Link>
            </div>
            </div>

            <div className='category'>
            <h2 className='category-h2'>Accessories</h2>
            <div className='category-box'>
                <Link to='/accessories'>
                <img src='https://cdn0.iconfinder.com/data/icons/electronics-27/24/252-512.png' alt='Accessories' className='category-img'/>
                </Link>
            </div>
            </div>

            <div className='category'>
            <h2 className='category-h2'>Pedals</h2>
            <div className='category-box'>
                <Link to='/pedals'>
                <img src='https://cdn4.iconfinder.com/data/icons/heavy-lines-20-music-icons/100/17_guitar_pedal-512.png' alt='Pedals' className='category-img'/>
                </Link>
            </div>
            </div>

            
        </div>

        </div>
    )
}
export default Landing