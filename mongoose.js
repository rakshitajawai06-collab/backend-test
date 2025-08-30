const mongoose=require('mongoose');
async function connection(){
    await mongoose.connect("mongodb+srv://rakshitajawai06_db_user:XlNuu2HCGgWOgdyD@cluster0.oqzacwa.mongodb.net/ecom.dum")
 }
 const userschema=new mongoose.Schema({
    username:{
      type:String,
      required:true,
      unique:true,
      minlength:3
     },
     email:{
         type:String,
         required:true,
         unique:true,
     },
     password:{
         type:String,
         required:true,
         minlength:6
     },
     createdAt:{
         type:Date,
         required:true,
         default:Date.now
     },
     
 })
let usermodel=mongoose.model('user',userschema);
connection();
console.log('db connected successfully');