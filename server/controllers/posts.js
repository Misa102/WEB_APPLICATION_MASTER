import { PostModel } from "../models/PostModel.js";

export const getPosts = async(req, res)=>{
    // code ici pour query dans DB
    try{
        //find is a promis donc on a besoin await et function pour await on ajoute keyword async
        const posts = await PostModel.find(); //find() retourner tous les post dans db
        console.log('posts', posts);
        //respond to client
        res.status(200).json(posts);
    // le cas erreur qu'on récupère données à partir de BD
    }catch(err){ 
        res.status(500).json({error: err});
    }
}


//controller pour create un post
export const createPost =  async(req, res) =>{
   try{
        //newPost est envoyé par cote client
        const newPost = req.body;

        // sauvegader ces données dans la DB
        const post = new PostModel(newPost);
        await post.save();

        //répondre à client avec status succes et le contenu du post
        res.status(200).json(post);
   }catch(err){
        res.status(500).json({error: err});
   }
};


// controller pour mise à jour un post
export const updatePost =  async(req, res) =>{
    try{
         const updatePost = req.body;

         // données de retour par la methode findOneAndUpate est nouvelle données
         const post = await PostModel.findOneAndUpdate(
          { _id: updatePost._id},
          updatePost,
          {new: true}
          );
 
         //répondre à client avec status succes et le con tenu du post
         res.status(200).json(post);
    }catch(err){
         res.status(500).json({error: err});
    }
 };