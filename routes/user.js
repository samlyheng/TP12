var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const userService = require('../services/user');

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await userService.findById(id);
  res.json(result);
})

// all users
router.get('/all', auth.ensureSignedIn,  async (req, res) => {
   const result = await userService.findAll();
  //console.log(req.body);
  res.json(result);
})

router.post('/update-password', auth.ensureSignedIn, auth.currentUser, async (req, res, next) => {
  // to do
  const result = await userService.updatePass(req, res);
  //console.log(req.body);
  res.json(result);
})

router.post('/update', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  result = await userService.update(req, res);
  res.json(result);
})

router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  result = await userService.remove(req, res);
  res.json(result);
  
})

module.exports = router

