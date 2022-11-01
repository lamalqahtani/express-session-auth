const session = require('express-session');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(session(
    {
        secret:'Keep it secret',
        name:'uniqueSessionID',
        saveUninitialized:false,
        resave:false
    }
));

app.get('/',(req,res)=>{
    res.send('done!');
});

app.get('/login',(req,res)=>{
    if(req.session.loggedIn){
        res.send('you are already logged in');
    }else{
        res.send('login');
    }
});

app.post('/login',(req,res)=>{
    if(req.body.username == 'lamia' && req.body.password == '123'){
        //new session with username stored in it
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        res.send('logged in!! WELCOME!!');
    }else{
        res.redirect('/login');
    }
});

app.get('/test',(req,res)=>{
    res.send('hello, ' 
    + req.session.username 
    + ' you are logged in: '
    + req.session.loggedIn);
})
app.listen(8080,()=>console.log('express started!'));