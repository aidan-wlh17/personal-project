import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Components.scss'

const Amplifiers = props => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
        .then(res => {
            setProducts(products => [...products, ...res.data])
        })
        .catch(err => console.log(err))
    }, [])

    const ampMapper = products.filter((product, i) => {
        return product.category === 'Amplifiers & Speakers'
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
            {ampMapper}
          {console.log(products)}
        </div>
    )
}
export default Amplifiers