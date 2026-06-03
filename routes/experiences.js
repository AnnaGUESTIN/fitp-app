const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all (admin — includes inactive)
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM experiences ORDER BY sort_order, id');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET active only (public home page)
router.get('/public', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM experiences WHERE active = true ORDER BY sort_order, id');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM experiences WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const { title, description, lugar, hora, duracion, pax, is_hero, active, owned, price, hero_img, card_img } = req.body;
    if (!title) return res.status(400).json({ success: false, error: 'Title is required' });
    if (is_hero) await db.query('UPDATE experiences SET is_hero = false');
    const { rows } = await db.query(
      `INSERT INTO experiences (title,description,lugar,hora,duracion,pax,is_hero,active,owned,price,hero_img,card_img)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [title, description, lugar, hora, duracion, pax ?? 20, !!is_hero, active !== false, !!owned, price || '', hero_img, card_img]
    );
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, lugar, hora, duracion, pax, is_hero, active, owned, price, hero_img, card_img } = req.body;
    if (!title) return res.status(400).json({ success: false, error: 'Title is required' });
    if (is_hero) await db.query('UPDATE experiences SET is_hero = false WHERE id != $1', [id]);
    const { rows } = await db.query(
      `UPDATE experiences SET
         title=$1, description=$2, lugar=$3, hora=$4, duracion=$5, pax=$6,
         is_hero=$7, active=$8, owned=$9, price=$10, hero_img=$11, card_img=$12,
         updated_at=NOW()
       WHERE id=$13 RETURNING *`,
      [title, description, lugar, hora, duracion, pax ?? 20, !!is_hero, active !== false, !!owned, price || '', hero_img, card_img, id]
    );
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await db.query('DELETE FROM experiences WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH toggle active/inactive
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { rows } = await db.query(
      'UPDATE experiences SET active = NOT active, updated_at = NOW() WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH set as hero
router.patch('/:id/hero', async (req, res) => {
  try {
    await db.query('UPDATE experiences SET is_hero = false');
    const { rows } = await db.query(
      'UPDATE experiences SET is_hero = true, updated_at = NOW() WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH toggle owned
router.patch('/:id/owned', async (req, res) => {
  try {
    const { rows } = await db.query(
      'UPDATE experiences SET owned = NOT owned, updated_at = NOW() WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
