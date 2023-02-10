const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');

router.get('/messages', dbController.getMessages, (req, res) => {
  return res.status(200).json({ messages: res.locals.messages });
});

router.post('/messages', dbController.postMessages, (req, res) => {
  return res.status(201).json({ messages: res.locals.newMessage });
});

// get a full list of users
router.get('/users', dbController.getUsers, (req, res) => {
  return res.status(200).json({ users: res.locals.users });
});

router.get('/users/:username', dbController.getUserByUsername, (req, res) => {
  const { user } = res.locals;
  return res.status(200).json(user);
});

//get user_id by SSID cookie
router.get(
  '/user_id',
  cookieController.getSsidCookie,
  cookieController.verifySsidCookie,
  dbController.getUserBySsid,
  (req, res) => {
    const {
      user_id,
      user_avatar,
      user_name,
      user_firstname,
      user_lastname,
      user_email,
    } = res.locals;
    return res.status(200).json({
      user_id: user_id,
      avatar: user_avatar,
      user_name: user_name,
      user_firstname: user_firstname,
      user_lastname: user_lastname,
      user_email: user_email,
    });
  }
);

// create a new user with username, password and email...
router.post('/users', dbController.postUser, (req, res) => {
  const { user } = res.locals;

  return res.status(201).json(user);
});

module.exports = router;
