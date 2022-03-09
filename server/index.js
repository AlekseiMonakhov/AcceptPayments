const express = require ("express")
const mongoose = require ("mongoose")
const config = require ("config")
const paymentRoute = require ("./routes/payments.route")

const app = express()
const PORT = config.get('serverPort')

app.use(express.json())
app.use("/api", paymentRoute)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));
        app.listen(PORT, () => {
            console.log('Server start on port ', PORT)
        })
    }catch (err) {
        console.log(err)
    }
}

start()