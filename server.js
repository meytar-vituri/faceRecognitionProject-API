const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./consrollers/register');
const signin = require('./consrollers/signin');
const profile = require('./consrollers/profile');
const image = require('./consrollers/image');



const db = knex({
    client: 'pg',
    connection: {
      connectString : process.env.DATABASE_URL,
      ssl: true  
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{
    res.send(db.users);
})

app.get('/', (req, res) => {res.send('shit is getting real!')});
app.post('/signin',signin.handleSignin(db, bcrypt)); //different method to run this function
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) =>{ profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
    

app.listen(process.env.PORT || 3000, () => {
        console.log(`running on ${process.env.PORT}!`);
});