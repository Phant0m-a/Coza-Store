const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')

// custom Routes
const authRouter = require('./routes/userRouter');
// const homeRouter = require('./routers/homeRouter');
// const categoryRouter = require('./routers/catRouter.js');
// const courseRouter = require('./routers/courseRouter.js');
// const purchaseRouter = require('./routers/purchaseRouter.js');
// const lectureRouter = require('./routers/lectureRouter.js');
// ...

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayouts);
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(fileUpload());

// mongo connection
mongoose.connect(
    'mongodb://localhost:27017/coza',
    {
        useNewUrlParser: true,

        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongodb'));
// ...

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Coza Store API');
})

// app.use
app.use("/api/auth", authRouter);
// app.use("/api/home", homeRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/course", courseRouter);
// app.use("/api/purchase", purchaseRouter);
// app.use("/api/lecture", lectureRouter);
// ...

// app listener
app.listen(process.Port || 5000, () => console.log('Coza store server started at Port 5000')); 