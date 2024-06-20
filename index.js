const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(8080, () => {
    console.log("server is listening");
})

// let chat1 = new Chat({
//     from: "siddhart",
//     to: "sejal",
//     msg: "hiii",
//     created_at: new Date(),
// });

// chat1.save().then((res) => {
//     console.log(res);
// })

app.get("/chats", async(req,res) => {
    let chats = await Chat.find();
    
    res.render("index.ejs", {chats});
})

app.get("/chats/new", (req,res) => {
    res.render("form1.ejs");
})

app.post("/chats", (req,res) => {
    let {from , msg , to} = req.body;
    let newChat = new Chat({
        from : from,
        msg: msg,
        to: to,
        created_at: new Date(),
    });

     newChat.save().then((res) => {
        console.log("Chat Added");
     }).catch((err) => {
        console.log(err);
     });
      
    res.redirect("/chats");
})

app.get("/", (req,res) => {
    res.send("hello");
})

app.get("/chats/:id/edit", async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
   
})

app.put("/chats/:_id", async(req,res) => {
    let {_id} = req.params;
    let { msg: newMsg } = req.body;
    
    let updatedChat = await Chat.findByIdAndUpdate(_id,{msg: newMsg},{runValidators: true, new: true})
    
    console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:_id", async(req,res) => {
    let {_id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(_id);
    console.log(deletedChat);
    res.redirect("/chats");
})