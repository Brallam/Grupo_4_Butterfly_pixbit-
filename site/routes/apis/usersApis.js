const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/apis/userApisController')


router.get('/',userApiController.allEmails)




module.exports = router;