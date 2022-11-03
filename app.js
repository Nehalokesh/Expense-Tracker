const express = require('express');

const expense = express();

const cors = require('cors');

const bodyparser = require('body-parser');

const sequelize = require('./util/database');

const expenseRoutes = require('./routes/expense');

const orderModels = require('./models/order');

const Forgotpassword = require('./models/forgotpassword');

const resetPasswordRoutes = require('./routes/resetpassword')

const user = require('./models/user');

const expensedata = require('./models/expensedata');

expense.use(cors());

expense.use(bodyparser.json());

expense.use('/password', resetPasswordRoutes);

expense.use(expenseRoutes);

user.hasMany(expensedata)
expensedata.belongsTo(user)

user.hasMany(orderModels)
orderModels.belongsTo(user)

user.hasMany(Forgotpassword);
Forgotpassword.belongsTo(user);


sequelize
// .sync({force:true})
.sync()
.then(result =>{
    expense.listen(3000);
})
.catch(err =>{
    console.log(err)
})
