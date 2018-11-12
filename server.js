const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');



app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(error)=>{
        if (error){
            console.log('Unable to append to server.log!'); 
        }
    });
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
//     // next();
// })
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(require,response)=>{
    // response.send('<h1>Hello Express!</h1>');
    response.render('home.hbs',{
        pageTitle: 'Home Page ',
        welcomeMessage: 'Welcome to my website',
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});
// /bad - sned back json with errorMessage
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Can not access this page',
    });
});
app.listen(port,()=>{
    console.log('Server is run at port ',port);
});