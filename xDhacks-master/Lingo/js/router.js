const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const upload = multer();



router.use(upload.array()); 
router.use(express.static('public'));

router.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

router.get('/formdata', (req, res) => {
	res.send('GET route');
});

router.post('/formdata', (req, res) => {
	res.send('POST route');
});




module.exports = router;