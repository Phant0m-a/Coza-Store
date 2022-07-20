const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')

// custom Routes
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/admin/userRouter');
const blogRouter = require('./routes/blogRouter');
const blogCatRouter = require('./routes/admin/blogCatRoute');
const productTypeRouter = require('./routes/admin/productType');
const productRouter = require('./routes/admin/productsRouter');
const feedbackRouter = require('./routes/admin/feedbackRouter');
const faqRouter = require('./routes/admin/faqRouter');
const copyrightRouter = require('./routes/admin/copyrightRoute');
const termsRouter = require('./routes/admin/terms&conRouter');

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
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blogcat", blogCatRouter);
app.use("/api/admin/product", productRouter);
app.use("/api/admin/productType", productTypeRouter);
app.use("/api/admin/feedback", feedbackRouter);
app.use("/api/admin/faq", faqRouter);
app.use("/api/admin/copyright", copyrightRouter);
app.use("/api/admin/terms", termsRouter);

// ...

// app listener
app.listen(process.Port || 5000, () => console.log('Coza store server started at Port 5000')); 