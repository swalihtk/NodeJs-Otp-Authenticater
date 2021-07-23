const express=require("express");
const expressHandlebars=require("express-handlebars");
const bodyParser=require("body-parser");
const messagebird=require("messagebird")("zw33Oc3bWs1EFh3PP6YBVe3se");
require('dotenv').config();


// Middlewars
const app=express();
app.engine('handlebars', expressHandlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// App methods
app.get('/', (req, res)=>{
    res.render('step1', {});
})

app.post('/step2', (req, res)=>{
    let pNumber=req.body.number;
    console.log(pNumber)
    messagebird.verify.create(pNumber, {
        originator : 'Code',
        template:"Your verification code is %token"
    }, (err, response)=>{
        if(err){
            console.log(err);
            res.render('step1', {error:err.errors[0].description})
        }else{
            console.log(response.id)
            res.render('step2', {
                id:response.id
            })
        }
    })
})


app.post('/step3', (req, res)=>{
    let id=req.body.id;
    let token=req.body.token;

    console.log(req.body)

    messagebird.verify.verify(id, token, (err, response)=>{
        if(err){
            console.log(err);
            res.render('step2', {error:err.errors[0].description})
        }else{
            res.render('step3');
        }
    })
})

// Listen
app.listen(8080, ()=>console.log("Server running on port 8080"));