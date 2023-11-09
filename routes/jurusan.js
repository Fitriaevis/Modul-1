const express = require('express');
const router = express.Router();

//import express-validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');

const authenticateToken = require('../routes/auth/midleware/authenticateToken')

//1: Menampilkan Semua Jurusan
router.get('/', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM jurusan', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Jurusan',
                data: rows,
            });
        }
    });
});

//2: Menambahkan Jurusan Baru
router.post('/store', authenticateToken, [
    // Validation
    body('nama_jurusan').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    let data = {
        nama_jurusan: req.body.nama_jurusan
    };
    connection.query('INSERT INTO jurusan SET ?', data, function (err, result) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'Data Jurusan berhasil ditambahkan',
                insertedId: result.insertId
            });
        }
    });
});

//3: Menampilkan Jurusan Berdasarkan ID
router.get('/:id', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM jurusan WHERE id_j = ?', [id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        }
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Jurusan tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Jurusan',
                data: rows[0],
            });
        }
    });
});

//4: Memperbarui Jurusan Berdasarkan ID
router.patch('/update/:id', authenticateToken, [
    body('nama_jurusan').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    let id = req.params.id;
    let data = {
        nama_jurusan: req.body.nama_jurusan,
    };
    connection.query('UPDATE jurusan SET ? WHERE id_j = ?', [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Jurusan tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Jurusan berhasil diperbarui',
            });
        }
    });
});

//5: Menghapus Jurusan Berdasarkan ID
router.delete('/delete/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM jurusan WHERE id_j = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Jurusan tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Jurusan berhasil dihapus',
            });
        }
    });
});

module.exports = router;