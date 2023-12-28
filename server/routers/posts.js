import express from 'express';
import {getPosts , createPost, updatePost} from '../controllers/posts.js';

const router = express.Router();

//un url quand on utilise méthode get et post
//http://localhost:5000/posts

// route pour récupérer un citation
router.get('/', getPosts);

// oute pour la création d'un ciation
router.post('/', createPost);

// route pour la mise à jour d'un citation
router.post('/update', updatePost);

export default router;
