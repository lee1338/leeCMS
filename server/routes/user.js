const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sequelize = require('../bin/database');
const { progress } = require('../bin/progress')
const Users = require('../database/user');
const router = express.Router();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const checkPasswords = async (password, hashedPw) => {
	if (!password) return false;
	return await bcrypt.compare(password, hashedPw);
}

const generateSSO = (username) => {
  return username+'-'+crypto.randomBytes(20).toString('hex');
}

router.get('/session',  async (req, res) => {
  try {
    if (req.session.user) {
      const user = await Users.findOne({
        where: {
          id: req.session.user
        },
      });

      res.json(user.toJSON());
    }
 } catch (error) {
    console.error('Error:', error);
 }
});

router.post('/motto',  async (req, res) => {
  try {
    const pool = req.mysql;
    await pool.query(
      'UPDATE users SET motto = ? WHERE id = ?', [req.body.motto, req.session.user] //Beispiel für gute query!!!!
    );

    res.json(req.body.motto);
 } catch (error) {
    console.error('Error:', error);
    res.json({ error: 'An error occurred.' });
 }
});

router.get('/currencies',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [currencies] = await pool.query(
      'SELECT * FROM users_currency WHERE user_id = ?', [req.session.user]
    );

    res.json(currencies);
 } catch (error) {
    console.error('Error:', error);
    res.json({ error: 'An error occurred.' });
 }
});

router.get('/logout',  async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        res.json();
      }
    });
 } catch (error) {
    console.error('Error:', error);
    res.json({ error: 'An error occurred.' });
 }
});

router.post('/login',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [rows, fields] = await pool.query(
      `SELECT * FROM users where username = "${req.body.username}"`
    );
    if (rows[0]) {
      const user = rows[0];
      if (await checkPasswords(req.body.password, user.password)) {
        user.auth_ticket = generateSSO(rows[0].username);
        await pool.query(
          `UPDATE users SET auth_ticket = "${user.auth_ticket}" where id = ${user.id}`
        );
        req.session.user = user.id;

        res.json(user);
      }
      else throw({ error: 'Falsches Passwort' });
    } else throw({ error: 'Dieser Benutzer existiert nicht' });
 } catch (error) {
    console.error(error);
    res.json(error);
 }
});

router.post('/register',  async (req, res) => {
  try {
    const pool = req.mysql;
    const [exists] = await pool.query(
      `SELECT username FROM users where username = "${req.body.username}" OR mail = "${req.body.mail}"`
    );
    if (exists[0]) {
      progress(req);
      let error = 'Dieser Benutzername wird bereits verwendet';
      if (exists[0].username != req.body.username) error = 'Diese Email Adresse wird bereits verwendet';
      throw({ error: error });
    }
    if (req.body.username.length < 3) throw({ error: 'Der Benutzername ist zu kurz' });
    const query = 'INSERT INTO users (username, mail, password, auth_ticket, look, account_created, ip_register, ip_current) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      req.body.username,
      req.body.mail,
      await hashPassword(req.body.password),
      generateSSO(req.body.username),
      'ch-210-66.sh-300-64.hd-180-10.hr-100-110.lg-270-82.0',
      Math.floor(Date.now()/1000),
      req.ip,
      req.ip,
    ];
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 1) {
      const [createdUser] = await pool.query(
        'SELECT * FROM users WHERE id = ?', [result.insertId]
      );
      req.session.user = createdUser[0].id;

      res.json(createdUser[0]);
    } else throw({ error: 'Failed to create a new user' });
 } catch (error) {
    console.error(error);
    res.json(error);
 }
});


module.exports = router;
