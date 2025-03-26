const express = require('express');
const multer = require('multer');
const imagesUpload =
  require('../../controllers/imagesUploadController.js').imagesUpload;
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
const maxFilesCount = 5;

router.put(
  '^/$|/index(.html)?',
  authMiddleware,
  upload.array('files', maxFilesCount),
  imagesUpload
);

module.exports = router;
