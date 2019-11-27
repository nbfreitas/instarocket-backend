const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/postController');
const LikeController = require('./controllers/likeController');

const routes = new express.Router();

// permite que o express entenda o multipart do insomnia
// arquivos fisicos e de texto
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

// rota que permite likes
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
