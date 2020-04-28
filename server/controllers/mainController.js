module.exports = {
    getProducts: (req, res) => {
        console.log('hit')
        const db = req.app.get('db')

        db.products.get_products()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },

    getSingleProduct: (req, res) => {
        const db = req.app.get('db')
        const {product_id} = req.params

        db.products.get_single_product(product_id)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send(err))
    },

    addToCart: (req, res) => {
        console.log(req.body)
        const {cart_id, product_id, price} = req.body,
        db = req.app.get('db')

        db.cart.add_to_cart(cart_id, product_id, price)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    getCart: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.cart.get_cart(id)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(500).send(err))
    },
    deleteItem: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.cart.remove_item(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    completePurchase: async(req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.cart.complete_purchase(id)

        //Stripe stuff

        let userCart = await db.cart.create_cart(id)
        console.log(userCart[0])
        let sessionUser = {...req.session.user, cart_id: userCart[0].cart_id}
        req.session.user = sessionUser
        res.status(200).send(req.session.user)
    }
}