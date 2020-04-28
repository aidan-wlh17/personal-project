import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Components.scss'

const Pedals = props => {
    console.log(props)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
        .then(res => {
            setProducts(products => [...products, ...res.data])
        })
        .catch(err => console.log(err))
    }, [])

    const pedalMapper = products.filter((product, i) => {
        return product.category === 'Pedals'
    }).map((product, i) => {
        return <div className='product-box' key={i} onClick={() => {
            props.history.push(`products/viewproduct/${product.product_id}`)
        }}>


                <div className='img-box'>
                <img className='product-img' src={product.image}/>
                </div>


                <p className='product-text'>{product.name}</p>
                <p className='product-text'>${product.price}</p>
                </div>
    })


    return (
        <div className='mapped-product'>
            {pedalMapper}
          {console.log(products)}
        </div>
    )
}
export default Pedals