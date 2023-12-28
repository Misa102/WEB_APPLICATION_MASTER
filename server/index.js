import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import posts from './routers/posts.js';
import mongoose from 'mongoose';


 const app = express();
 // port défault, quand y a pas de port -> port 5000
 const PORT = process.env.port || 5000;

 const URI ='mongodb+srv://admin:webm1@cluster0.7mbewn7.mongodb.net/?retryWrites=true&w=majority'



// pour pouvoir utiliser les middleware pour exécuter certains codes apres le server recois appelle à coté client
app.use(bodyParser.json())
//30mb est le capacité que client peut submit on server
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

//route test
app.use('/posts', posts)


mongoose
    .connect(URI)
    .then(()=>{
        console.log('Connected to DB');
        app.listen(PORT,()=>{
            console.log('Server is running on port ${PORT}');
        });
    })
    .catch(err =>{
        console.log('err',err)
    })



 