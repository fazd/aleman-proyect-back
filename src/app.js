const express= require('express')
const userRouter = require('./routers/user')
const cors = require('cors')
const port = process.env.PORT
require('./db/db')

const app = express()
app.use(cors())

app.use(express.json())
app.use(userRouter)


//

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})