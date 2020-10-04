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
      host : '127.0.0.1',
      user : 'meytar',
      password : '1234567890',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{
    res.send(db.users);
})

app.post('/signin',signin.handleSignin(db, bcrypt)); //defferent method to run this function
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) =>{ profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
    

app.listen(3000, () => {
        console.log('running on 3000!');
});