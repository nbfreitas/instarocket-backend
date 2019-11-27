const multer = require('multer');
const path = require('path'); // biblioteca de caminhos

module.exports = {
  // define a pasta destino e o nome dos arquivos de upload
  // eslint-disable-next-line new-cap
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
};
