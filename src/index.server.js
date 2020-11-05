const express = require('express');
const env = require('dotenv');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData')
const orderRoutes = require('./routes/orders')

//environment variable
env.config();

//mongodb connection
//mongodb+srv://user:<password>@cluster0.qug1p.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qug1p.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true
}
).then(()=>{
    console.log('Database connected')
});

app.use(cors())

app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')))

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',orderRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server running at ${process.env.PORT}`);
});
