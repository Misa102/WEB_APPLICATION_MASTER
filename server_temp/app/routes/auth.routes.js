const express = require("express");
const router = express.Router();

const db = require("../models");
const Authority = db.authority;

router.get('/auth',(req,res) => {
    const authUser = new Authority({ name: "user" });
    
    authUser.save()
    .then( data => {
        res.send(data);
       
    })
    .catch(err=>{
        res.json({message:err});
    });
});

module.exports = router;