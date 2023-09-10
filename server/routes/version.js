const express = require('express');
const versions = require('../versions.json');
const router = express.Router();

router.get('/',  async (req, res) => {
  try {
    res.json(versions);
  } catch(e) {
    console.error(e);
  }
});

module.exports = router;
