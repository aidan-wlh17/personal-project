const bcrypt = require('bcrypt'),
      nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD, SECRET_KEY} = process.env,
      stripe = require('stripe')(SECRET_KEY)
      

module.exports = {
    register: async(req, res) => {
        console.log(req.session)
        const {username, password} = req.body
        const db = req.app.get('db')

        let user = await db.user.check_user(username)
        console.log(user)
        if(user[0]) {
            return res.status(400).send('Username already in use')
        }

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        let newUser = await db.user.register_user([username, hash])

        let userCart = await db.cart.create_cart(newUser[0].user_id)
        let sessionUser = {...newUser[0], ...userCart[0]}

        req.session.user = sessionUser
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '587',
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            })
            let info = await transporter.sendMail({
                from: `Test <${EMAIL}>`,
                to: `${username}`,
                subject: 'Thank you for registering!',
                text: "Your account has been registered",
                html: '<div>This is a NodeMailer test</div>',
                attachments: [
                    ///{fileName: name_of_file, path: file_path}
                ]
            }, (err, res) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).send(info)
                }
            })

        } catch(err) {
            res.status(500).send(err)
        }

        res.status(201).send(req.session.user)
    },

    login: async(req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let user = await db.user.check_user(username)
        if(!user[0]) {
            return res.status(400).send('User does not exist')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated) {
            return res.status(401).send('Incorrect password')
        }

        delete user[0].password
        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    email: async(req, res) => {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '587',
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            })
            let info = await transporter.sendMail({
                from: `Test <${EMAIL}>`,
                to: 'aidantrujillo3@gmail.com',
                subject: 'NodeMailer Test',
                text: 'This is a NodeMailer test',
                html: '<div>This is a NodeMailer test</div>',
                attachments: [
                    ///{fileName: name_of_file, path: file_path}
                ]
            }, (err, res) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).send(info)
                }
            })

        } catch(err) {
            res.status(500).send(err)
        }
    },

    completePayment: async(req, res) => {
        const {token, amount} = req.body

        const charge = stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token.id,
            
        }, function(err, charge){
            if(err){
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })

        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '587',
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            })
            let info = await transporter.sendMail({
                from: `Test <${EMAIL}>`,
                to: 'aidantest26@gmail.com',
                subject: 'Checkout complete',
                text: 'Thank you for your purchase!',
                html: '<div>Thank you for your purchase!</div>',
                attachments: [
                    ///{fileName: name_of_file, path: file_path}
                ]
            }, (err, res) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).send(info)
                }
            })

        } catch(err) {
            res.status(500).send(err)
        }
    }
    
}