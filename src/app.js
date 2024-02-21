const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const helmet = require('helmet')


const gridfsstream = require('gridfs-stream')
const multergridfsstorage = require('multer-gridfs-storage') 
const morgan = require('morgan')

const url = require('url');
const path = require('path');

const register = require('../Controller/auth')
const auth = require("../Routers/auth")
const userRouter  = require("../Routers/userRouter")
const postRoutes = require("../Routers/postRoutes")
const createpost = require("../Controller/createpost")

const filename = url.pathToFileURL(__filename);
const dirname = path.dirname(filename.pathname);

// configuration 

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use("/assests", express.static(path.join(dirname, 'public/assets')))

// File STORAGE 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.post('/auth/register',upload.single("picture"),register)
app.use("/auth", auth);
app.use("/posts", auth, upload.single("picture"), createpost);

app.use("/users",userRouter)

app.use("/posts",postRoutes)

const port = process.env.port
const urlcon = process.env.mongodburl

mongoose.connect(urlcon, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(port,()=>console.log(`Server is running on ${port}`)))
.catch((err)=> console.log(err))