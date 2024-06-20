const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

Chat.insertMany([{
    from: "vaishnavi",
    to: "siddharth",
    msg: "kha hai",
    created_at: new Date,
},
{
    from: "prajwal",
    to: "keshav",
    msg: "chal room",
    created_at: new Date,
},
{
    from: "shreyas",
    to: "siddharth",
    msg: "kbb aara hai",
    created_at: new Date,
},
{
    from: "manish",
    to: "sidhu",
    msg: "haa bta",
    created_at: new Date,
},
{
    from: "chahat",
    to: "sid",
    msg: "movies",
    created_at: new Date,
},
])

