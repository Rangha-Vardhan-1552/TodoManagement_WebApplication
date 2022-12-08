const { request, response } = require("express")
const express=require("express")
const app=express()
const { Todo }=require("./models")
const bodyParser=require("body-parser")
const todo = require("./models/todo")
const path =require("path")



app.use(bodyParser.json())
app.set("view engine","ejs")
app.get("/",async(request,response)=>{
    const alltodos=await Todo.getTodos();
    if(request.accepts("html")){
        response.render('index',{
            alltodos
        })
        
    }else{
        response.json({
            alltodos
        })
    }
    
});

 
//app.use(express.static(path.join(__dirname,'public')));


app.get("/todos",(request,response)=>{
    //response.send("Hello World....!")
    console.log("Todo List")
})



app.post("/todos", async(request,response)=>{
    console.log("creating a todo",request.body)
    //Todo
    try{
        const todo= await Todo.addTodo({title:request.body.title,dueDate:request.body.dueDate,completed:false})
        return response.json(todo)
    }
    catch(error){
        console.log(error)
        return response.status(422).json(error)
    }

})



app.put("/todos/:id/markAsCompleted",async (request,response)=>{
    console.log("we have update a todo with ID:",request.params.id)
    const todo=await Todo.findByPk(request.params.id)
    try{
        const updatetodo=await todo.markedAsCompleted()
        return response.json(updatetodo)
    }
    catch(error){
        console.log(error)
        return response.status(422).json(error)
    }
})

app.delete("/todos/:id",(request,response)=>{
    console.log("delete a todo with ID:",request.params.id)
})
//app.listen(4000,()=>{
//    console.log("express server started at port 4000")
//})
module.exports=app;