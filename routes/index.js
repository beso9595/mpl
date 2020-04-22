const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Express'});
});

router.get('/list/:user/:dir', (req, res, next) => {
  fs.readdir(`/home/${req.params.user}/${req.params.dir}`, (err, files) => {
    //handling error
    if (err) {
      res.status(500);
      res.json();
    } else {
      res.json(files.filter(file => {
        const parts = file.split('.');
        return parts.length > 1 && parts[parts.length - 1] === 'mp3';
      }));
    }
  });
});

router.get('/file/:user/:dir/:title', (req, res, next) => {
  const path = `/home/${req.params.user}/${req.params.dir}/${req.params.title}`;
  res.download(path);
});



module.exports = router;
