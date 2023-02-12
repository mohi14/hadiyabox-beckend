const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const morgan = require('morgan');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');


const userRouter = require('./routes/userRouter');


const app = express();

app.use(morgan('dev'));

// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'))
// }


dotenv.config({path : './backend/config/.env'});

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV



connectDB();

app.use(express.json());



app.use('/api/users', userRouter);




console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build','build', 'index.html'))
    })
}else{
    app.get('/',(req,res)=> {
        res.status('Api is running....')
    })

}



// Error handler middlewares . 
app.use(notFound);
app.use(errorHandler);



app.listen(PORT , console.log(`Server running in ${MODE} on port ${PORT}`.yellow.bold));
