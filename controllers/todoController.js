var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//db conection
mongoose.connect('mongodb://test:test@ds019976.mlab.com:19976/todo');
//db schema
var todoSchema=new mongoose.Schema({
  item: String
});

var Todo=mongoose.model('Todo',todoSchema);
/*
var itemOne= Todo({item:'Get Biriyani'}).save(function(err){
  if(err) throw err;
  console.log('Item Saved');
});
*/
//var data=[{item:'get milk'},{item:'get chicken'},{item:'get mutton'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports=function(app){

  app.get('/todo',function(req,res){
    //get data from mongoose
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });

  });

  app.post('/todo',urlencodedParser,function(req,res){
    //get data from user and save in DB
    var newTodo= Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });

  app.delete('/todo/:item',function(req,res){
    //delete data frm DB
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });

};
