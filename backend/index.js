const express = require('express')
const cors = require('cors')
const { connection } = require('./db')
const { UserRouter } = require('./routes/user.routes')
const { ProductRouter } = require('./routes/products.routes')
const { CartRouter } = require('./routes/cart.routes')
const { middleware } = require('./middleware/user.middleware')
const app = express()
app.use(express.json())
var whitelist = ['https://the-lucky-shop.vercel.app', 'http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
app.use('/user', UserRouter)
app.use('/products', ProductRouter)
app.use('/cart', middleware, CartRouter)


app.listen(4500, async () => {
    try {
        await connection
        console.log('Connected to database!')
    } catch (error) {
        console.log('Failed to connect database!')
    }
    console.log('Server is running at 4500')
})