const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const appRoute = require("./routes/apps");
const newRoute = require("./routes/news");
const delRoute = require("./routes/dels");
var cors = require('cors')


dotenv.config();
const url = `mongodb+srv://max:Password123@cluster0.owcfc.mongodb.net/python01?retryWrites=true&w=majority`
const connectionParams={
    useNewUrlParser: true,
//    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then(()=>{
    console.log("Connected to MongoDB")
    })
    .catch((err)=> {
        console.error(`Error connecting to database.n${err}`);
    })

//middleware
//middleware
//const corsOptions = { 
    // origin:'https://abc.onrender.com',
//    AccessControlAllowOrigin: '*',  
//    origin: '*',  
//    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
//  }
//app.use(cors(corsOptions))

app.use(cors())

app.use(express.json());
app.use(helmet());
app.use(morgan("comman"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/apps", appRoute);
app.use("/api/news", newRoute);
app.use("/api/dels", delRoute);

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

app.listen(8800,()=>{
    console.log("Backen server is running change")
})
