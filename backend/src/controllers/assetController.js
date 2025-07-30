import path from 'path';
import prisma from '../prisma/client.js';

export const uploadAsset = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { originalname, filename, mimetype, size } = req.file;

  
  try {
    const asset = ({
      data: {
        name: originalname,
        filePath: path.join('uploads', filename),
        type: mimetype,
        size,
      },
    });

    res.status(201).json(asset);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload asset' });
  }
};
