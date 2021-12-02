const express = require('express');
const appointmentRouter = require('./routers/appointment');
const userRouter = require('./routers/user');
const petRouter = require('./routers/pet');
const app = express();
app.use(express.json()); // Conversor a codigo JSON: MIDDLEWARE
const dotenv = require('dotenv').config()

app.use('/appointment', appointmentRouter)
app.use('/user', userRouter)
app.use('/pet', petRouter)

app.listen(process.env.PORT, () => console.log('Funcionando'))
console.log(process.env.PORT)