const multer = require('multer');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const absolutePath = 'C:/Users/Fatoumata DEMBELE/Desktop/images'; // Remplacez par le chemin approprié
    callback(null, absolutePath);
    // callback(null, 'images');  C:/Users/Fatoumata DEMBELE/Desktop
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
module.exports = multer({storage: storage}).single('image');