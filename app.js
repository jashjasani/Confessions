var express = require('express');
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://adminjash:jash1911@cluster0.pa7xf.mongodb.net/todolistDB", {useNewUrlParser: true,useUnifiedTopology: true});

let app = express();

const ConfessSchema = new mongoose.Schema({
    name : String,
    content: String,
    date:String
});

var Confession = mongoose.model("Confession",ConfessSchema);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    Confession.find({},function(err,results){
        var count= results.length;
        results=results.reverse();
        if(err){
            console.log(err);
        } else{
            res.render("index",{count:count,results:results});        
        }
     });
    
    
})
.post("/",(req,res)=>{
    var today=new Date();
    var day="";
    day=today.getDate()+":"+today.getMonth()+":"+today.getFullYear();
    var name= req.body.name;
    var content = req.body.content;
    if(content=="" || name==""){
        res.render("error");
    }else{
        var confession1 = new Confession({name:name,content:content,date:day});
        confession1.save(function(err){
            if(err){
                console.log(err);
            } else{
                res.redirect("/");
            }
        });
    }
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running at port 3000");
})