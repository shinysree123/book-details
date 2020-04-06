var Express= require('express');
var Bodyparser=require('body-parser');
var Mongoose=require('mongoose');
var app=Express();
app.use(Bodyparser.urlencoded({extended:false}))
const bookSchema =new Mongoose.Schema({
    title:String,
    author:String,
    descr:String,
    price:Number,
    publisher:String,
    distributor:String
});
 var bookModel = Mongoose.model('books',bookSchema);
 Mongoose.connect("mongodb+srv://shinyjoseph:shiny@123@cluster0-jlqrf.mongodb.net/test?retryWrites=true&w=majority");



app.get('/',(req,res)=>{
    res.send("hii");
});
app.post('/books',async(req,res)=>{
    // var gettitle=req.body.title;
    // var getauthor=req.body.author;
    // var getdescr=req.body.descr;
    // var getprice=req.body.price;
    // var getpublisher=req.body.publisher;
    // var getdistributor=req.body.distributor;

    try {
        var bookdata = new bookModel(req.body);
        var result = await bookdata.save();
        res.json(result);
        
        } 
    catch (error) 
        {
        console.log(error);
        res.status(500).send(error);
        }   
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server started");
});





