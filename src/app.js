const path=require('path');

const express=require('express');

const geocode=require('../utils/geocode');
const weathercode=require('../utils/weathercode');
const hbs=require('hbs');
const { env } = require('process');

const publicdirectoryPath=path.join(__dirname,'../public');
const viewpath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');

const app=express();
const port=process.env.PORT||3000;

//Setting up the view engine and path
app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(partialspath);

//setting up the static directory
app.use(express.static(publicdirectoryPath));

app.get('',(req,res)=>{
    res.render('weather',{
        title:'Weather',
        name:'Aryan '
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Aryan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is a sample help message',
        name:'Aryan'
    })
})

app.get('/index',(req,res)=>{
    res.render('index',{
        title:'Index',
        name:'Aryan'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Please enter the search location");
    }
    
  geocode(req.query.address,(err,data)=>{
      if(err){
          res.send({error:err})
      }
      else{
          weathercode(req.query.address,(error,doto)=>{
              if(error)
              res.send({error})
              else{
                  res.send({
                      location:data.locus,
                      forecast:doto,
                      address:req.query.address
                  })
              }
          })
      }
  })

})



app.get('*',(req,res)=>{
    res.send("Wep Page not found (error 404)");
})

app.listen(port,()=>{
    console.log('Server is up and running');
})

