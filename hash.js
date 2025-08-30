const bcrypt = require('bcrypt');
async function hashing(){
    let password="hello123"

    let hashPassword=await bcrypt.hash(password,10);
    console.log(hashPassword)
}
hashing();