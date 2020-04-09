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
 Mongoose.connect("mongodb+srv://shinyjoseph:shiny@cluster0-x64bo.mongodb.net/test?retryWrites=true&w=majority");



app.get('/',(req,res)=>{
    res.send("hii");
});
app.post('/books',async(req,res)=>{
    var gettitle=req.body.title;
    var getauthor=req.body.author;
    var getdescr=req.body.descr;
    var getprice=req.body.price;
    var getpublisher=req.body.publisher;
    var getdistributor=req.body.distributor;

   try {
    var bookdata = new bookModel(req.body);
    var result = await bookdata.save();
    res.json(result);
       
   } catch (error) {
    console.log(error);
    res.status(500).send(error);
       
   }
});
app.post('/viewall',async(req,res)=>{
    try {
        var result=await bookModel.find();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
});
app.post('/search',(req,res)=>{
    bookModel.find(req.body,(error,data)=>{
        if (error) {
            throw error;
        } else {
            res.send(data);
        }
    });
});
app.post('/search1',(req,res)=>{
    var searchkey = req.body.element
    bookModel.find({"author":searchkey},(error,data)=>{
        if (error) {
            throw error;
            
        } else {
            res.send(data)
        }
    });
});

app.listen(process.env.PORT || 3567, () => {
    console.log("server started");
});




