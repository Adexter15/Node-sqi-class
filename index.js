const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));


let users = [];


app.get('/signup', (req, res) => {
    res.render('signup', { message: null });
});


app.get('/login', (req, res) => {
    res.render('login', { error: null });
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

   
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      
        res.render('signup', { message: 'User already exists. Please log in.' });
    } else {
        
        users.push({ firstName, lastName, email, password });
        console.log('Users after signup:', users);  

       
        res.redirect('/login');
    }
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
       
        res.redirect('/dashboard');
    } else {
       
        res.render('login', { error: 'Invalid email or password' });
    }
});
//personal work
app.post("/signin",(reqmres) =>{
    console.log(req.body);
    const existuser = userarray.find((user) =>user.email == req.body.email)
    console.log(existuser);
    if(!existuser){
        console.log("you are not a registered user please sign up");
    }else{
        if(existuser.password == req.body.password){
            console.log("you are logged in");
        }else{
            console.log("wrong password");
        }
    }

        
    
    
})


app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
