const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');

const osUserDir = os.platform() === 'darwin' ? 'Users' : 'home';
const path = `/${osUserDir}/${process.env.USER}`;

router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

router.get('/list/:dir', (req, res) => {
    fs.readdir(`${path}/${req.params.dir}`, (err, files) => {
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

router.get('/file/:dir/:title', (req, res) => {
    res.download(`${path}/${req.params.dir}/${req.params.title}`);
});


module.exports = router;
