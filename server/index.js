require('dotenv').config()

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT
      app = express()


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge : 1000 * 60 * 60}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.use(express.json())

//Auth endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('api/logout', authCtrl.logout)
// app.post('/api/email', authCtrl.email)

//Stripe endpoint

app.post('/api/payment', authCtrl.completePayment)

//Main endpoints
app.get('/api/products', mainCtrl.getProducts)
app.get('/api/get-product/:product_id', mainCtrl.getSingleProduct)
app.post('/api/cart-item', mainCtrl.addToCart)
app.get('/api/cart/:id', mainCtrl.getCart)
app.delete('/api/cart-item/:id', mainCtrl.deleteItem)
app.put('/api/checkout/:id', mainCtrl.completePurchase)

app.listen(port, () => console.log(`Server running on port ${port}`))