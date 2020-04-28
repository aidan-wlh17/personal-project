import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../redux/reducer'
import {getProducts} from '../redux/productReducer'
import StripeCheckout from 'react-stripe-checkout'
import stripe from '../stripe'
import axios from 'axios'
import './Components.scss'

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cart: []
        }
    }
    
    componentDidMount() {
        this.getCart()
    }

    getCart = () => {
        axios.get(`/api/cart/${this.props.user.cart_id}`)
        .then(res => this.setState({cart: res.data}))
        .catch(err => console.log(err))
    }

    deleteItem = (id) => {
        axios.delete(`/api/cart-item/${id}`)
        .then(() => this.getCart())
        .catch(err => console.log(err))
    }

    

    onToken = async(token) => {
        token.card = void 0

        await axios.post('/api/payment', {token,})
                    .then(() => {
                        alert('Payment Submitted')
                    })
                    .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.cart)
        const mappedCart = this.state.cart.map((item, i) => {
            return (
                <div key={i} className='cart-items'>
                    <img src={item.image} alt={item.name} className='cart-img'/>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button onClick={() => this.deleteItem(item.cart_item_id)}>X</button>
                </div>
            )
        })

        const mappedPrices = this.state.cart.map((item, i) => {
            return (
                <div key={i} className='map-price'>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                </div>
            )
        })

        const total = this.state.cart.reduce((acc, currentValue) => {
            return acc += +currentValue.price
        }, 0)
        return (
            <div className='cart'>
                <div className='cart-test'>
                {mappedCart}
                </div>

                <div className='total-price-box'>
                {mappedPrices}
                <div className='total'>
                <p>Total: </p>
                ${total}
                </div>

                <div className='checkout-btn'>
                <StripeCheckout label='Proceed to Checkout' token={this.onToken} stripeKey={stripe.publicKey} amount={total * 100}  />
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return {
        user: reduxState.user,
        products: reduxState.products
    }
}

export default connect(mapStateToProps, {getUser, getProducts})(Cart)