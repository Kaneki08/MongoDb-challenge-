const express = require('express')
const app = express()
const MongoClient = require ('mongodb')
var ObjectId = require('mongodb').ObjectID;

let db;
const port = 3000;
app.use(express.json())
const uri = "mongodb+srv://derick:pao@cluster0.g9ev4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(uri, {useUnifiedTopology:true}, function(err,client){
    console.log("Connected to MongoDB successfully");
    db = client.db("mongodb-challenge");
})

app.listen(port, function(req,res){
    console.log("listening at port:" + port)
})


app.get('/getBlogs',function (req,res){
    db.collection('blogs').find({}).toArray(function(error,document){
        if (error) throw error;
        for(let counter = 0; counter < document.length;counter++){
            res.write(" Name " + document[counter].title + " Description " + document[counter].content + " ObjectID: " + document[counter]._id + '\n' );
        }
        res.end();
    })
})

app.post('/customBlog', function (req,res){
    db.collection('blogs').insertOne({
        title: req.body.title,
        content: req.body.content
    },
    function(err,result){
        if(err) throw err;
        res.send ('Hero Added successfully');
        })
})



app.post('/findHeroByID', function(req,res){
    db.collection('blogs').findOne({
        _id: req.body._id
    })
    db.collection('blogs').find({"_id" : ObjectId(req.body._id)}).toArray( function(error, documents){
    if (error) throw error;
    console.log(documents)
    res.send(documents)
    })
})














