const express = require('express');
const sequelize = require('../bin/database');
const News = require('../database/news');
const router = express.Router();

const { HK_MINRANK } = process.env;

router.get('/',  async (req, res) => {
  try {
    const news = await News.findAll({
      order: [['id', 'DESC']],
      limit: 12,
    });

    res.json(news);
 } catch (error) {
    console.error('Error:', error);
    res.json({error: error});
 }
});

router.post('/hk/edit',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [users] = await pool.query(
      'SELECT * FROM users WHERE id = ?', [req.session.user]
    );
    if (!users[0]) throw('No session available');
    const user = users[0];

    if (user.rank >= Number(HK_MINRANK)) {
      const query = `UPDATE hotelview_news SET title = ?, text = ?, image = ? WHERE id = ?`;
      const values = [req.body.title, req.body.text, req.body.image, req.body.id];
      const [result] = await pool.query(query, values);
      if (result.affectedRows === 1) {
        const [news] = await pool.query(
          'SELECT * FROM hotelview_news WHERE id = ?', [req.body.id]
        );

        res.json(news[0]);
      } else throw({error: 'Failed to edit news'});
    }
 } catch (error) {
    console.error('Error:', error);
    res.json({error: error});
 }
});

router.post('/hk/create',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [users] = await pool.query(
      'SELECT * FROM users WHERE id = ?', [req.session.user]
    );
    if (!users[0]) throw('No session available');
    const user = users[0];

    if (user.rank >= Number(HK_MINRANK)) {
      const query = 'INSERT INTO hotelview_news (title, text, image, button_text, button_link) VALUES (?, ?, ?, ?, ?)';
      const values = ['New article', '', 'webpromo_hlf_leonardo.png', '', ''];
      const [result] = await pool.query(query, values);
      if (result.affectedRows === 1) {
        const [createdNews] = await pool.query(
          'SELECT * FROM hotelview_news WHERE id = ?', [result.insertId]
        );

        res.json(createdNews[0]);
      } else throw({ error: 'Failed to create a new article' });
    }
 } catch (error) {
    console.error('Error:', error);
    res.json({error: error});
 }
});

router.delete('/hk/delete',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [users] = await pool.query(
      'SELECT * FROM users WHERE id = ?', [req.session.user]
    );
    if (!users[0]) throw('No session available');
    const user = users[0];

    if (user.rank >= Number(HK_MINRANK)) {
      const [result] = await pool.query(
        'DELETE FROM hotelview_news WHERE id = ?', [req.query.id]
      );

      res.json(result);
    }
 } catch (error) {
    console.error('Error:', error);
    res.json({error: error});
 }
});

module.exports = router;
