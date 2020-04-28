import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Landing from './Components/Landing'
import Profile from './Components/Profile'
import Guitars from './Components/Guitars'
import Amplifiers from './Components/Amplifiers'
import Accessories from './Components/Accessories'
import AuthModal from './Components/AuthModal'
import Pedals from './Components/Pedals'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/products/viewproduct/:product_id' component={Products} />
        <Route path='/profile' component={Profile}/>
        <Route path='/guitars' component={Guitars} />
        <Route path='/amps-speakers' component={Amplifiers}/>
        <Route path='/accessories' component={Accessories} />
        <Route path='/authmodal' component={AuthModal} />
        <Route path='/pedals' component={Pedals} />


    </Switch>
)