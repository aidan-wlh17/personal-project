import React, {Component} from 'react'
import AuthModal from './AuthModal'
import axios from 'axios'
import {connect} from 'react-redux'

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [],
            showModal: false
        }

        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    addToCart = (id, price) => {
        console.log(this.props.user)
        if(this.props.user.username) {
            axios.post('/api/cart-item', {cart_id: this.props.user.cart_id, product_id: id, price})
            .then(() => {
                window.alert('Item added to cart')
            })
            .catch(err => console.log(err))
        } else {
            this.handleToggle()
        }
    }

    componentDidMount(){
        this.getProduct()
    }

    getProduct = () => {
        axios.get(`/api/get-product/${this.props.match.params.product_id}`)
        .then(res => {
            console.log(this.props)
            this.setState({product: res.data})
        }).catch(err => console.log(err))
    }

    render() {
        console.log(this.state.product)
        const mappedProducts = this.state.product.map((product, i) => (
            <div key={i}>
                <header className='product-header'>
                    <h3>{product.name}</h3>
                </header>
                
                <div className='test'>
                    <img src={product.image} alt={product.name} className='product-image'/>
                    <div className='product-desc'>
                        <h3>Product Description</h3>
                            <div className='price-desc'>
                                <h2>${product.price}</h2>
                                <p>{product.description}</p>
                            </div>

                                <div className='button'>
                                <button onClick={() => this.addToCart(product.product_id, product.price)}>Add to Cart</button>
                                </div>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className='product-page'>
                <div className='product-info'>
                {mappedProducts}
                
                {this.state.showModal
                ? 
                <div className='auth-modal'>
                <AuthModal toggleFn={this.handleToggle}/>
                </div>
                : null}
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Products)