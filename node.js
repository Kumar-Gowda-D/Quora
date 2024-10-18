const express=require("express");
const methodOverride = require('method-override')
const app=express();
const port=8080;
app.use(express.static("public"));
app.set("views engine","ejs");
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
const { v4: uuidv4 } = require('uuid');
uuidv4();
let posts=[
    {
        id:uuidv4(),
        username:"kumar",
        content:"learning coding"
    },
    {
        id:uuidv4(),
        username:"kannik",
        content:"got selected for 1st internship",
    },
    {
        id:uuidv4(),
        username:"chithra",
        content:"got her dream job",
    }
];
app.get("/post",(req,res)=>{
    res.render("home.ejs",{posts});
});
app.get("/post/new",(req,res)=>{
    res.render("form.ejs");
});
app.post("/post",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
});
app.get("/post/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});
app.patch("/post/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("/post");
});
app.get("/post/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/post/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/post");
});
app.listen(port,()=>{
    console.log("request recieved");
});
