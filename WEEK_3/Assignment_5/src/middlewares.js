import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  console.log('todo: tee kuvakäsittely', req.file);

  if (!req.file) {
    next('Oh nou, kuvaa ei löydy! :(');
    return;
  }

  let extension = 'jpg';
  if (req.file.mimetype === 'image/png') {
    extension = 'png';
  } else if (req.file.mimetype === 'image/gif') {
    extension = 'gif';
  }

  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${req.file.path}_thumb.${extension}`); //tofile is a promise

  next();
};

export default createThumbnail;
