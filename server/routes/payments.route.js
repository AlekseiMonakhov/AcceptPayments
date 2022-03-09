const Router = require("express")
const payments = require("../models/Payments")
const router = new Router()

router.post('/payments', async (req, res) => {
    try {
        const { CardNumber, ExpDate, Cvv, Amount } = req.body
        const DateOfRequest = new Date()
        const payment = new payments({CardNumber, ExpDate, Cvv, Amount, DateOfRequest})
        await payment.save()
        let data = await payments.findOne({CardNumber ,DateOfRequest })
        let RequestId = data["_id"]
        return res.json({RequestId: `${RequestId}`, Amount: `${Amount}`})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router