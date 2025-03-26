const { createClient } = require('@supabase/supabase-js');
const { fileTypeFromBuffer } = require('file-type');

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const imagesUpload = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: 'No files uploaded or invalid file types' });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const type = await fileTypeFromBuffer(file.buffer);
      if (!type || !allowedMimeTypes.includes(type.mime)) {
        return res
          .status(400)
          .json({ error: `Invalid image format: ${file.originalname}` });
      }

      const filePath = `uploads/${Date.now()}-${file.originalname}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file.buffer, {
          contentType: type.mime,
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const { data: publicUrlData } = supabase.storage
        .from('your-bucket-name')
        .getPublicUrl(filePath);

      uploadedFiles.push(publicUrlData.publicUrl);
    }

    const { error } = await supabase
      .from('users')
      .update({ images: uploadedFiles })
      .eq('id', user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      message: 'Files uploaded and user updated',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { imagesUpload };
