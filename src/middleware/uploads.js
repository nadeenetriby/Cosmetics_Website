const multer = require('multer');

// Set storage options (where to save files temporarily)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/'); // Save uploaded files to 'temp' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add timestamp to file name
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
