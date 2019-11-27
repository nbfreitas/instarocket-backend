// Responsável pela lógica da aplicação

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/post');

module.exports = {
  // retorna os posts ordenados pela data de criação
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  // recebe os dados do arquivo - POST
  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const filename = `${name}.jpg`;

    // redimensiona a imagem pra 500px
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', filename),
      );

    // apaga arquivo original
    fs.unlinkSync(req.file.path);

    // salva no BD
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename,
    });

    // envia informação em tempo real do POST
    req.io.emit('post', post);

    return res.json(post);
  },
};
