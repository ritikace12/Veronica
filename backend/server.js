require('dotenv').config()  //now you can access api key
const app = require("./src/app")




app.listen(3000 ,() => {
     app.get('/',(req, res) => { //default route
        res.send('Hello World')
     })

     console.log("Server is Running") //for debugging

} ) //this works when our server starts