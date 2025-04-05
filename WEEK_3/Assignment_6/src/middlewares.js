import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const createThumbnail = async (req, res, next) => {
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

export const authenticateToken = (req, res, next) => {
  //console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log('token', token);

  if (token == null) {
    return res.sendStatus(401);
  }


  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export default createThumbnail;
