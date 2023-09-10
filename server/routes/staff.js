const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

router.get('/',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [staffs] = await pool.query(
      'SELECT * FROM users ORDER BY `rank` DESC'
    );

    res.json(staffs);
 } catch (error) {
    console.error('Error:', error);
    res.json({error: error});
 }
});

module.exports = router;
