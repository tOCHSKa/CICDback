const express = require('express');
const router = express.Router();
require('dotenv').config();
const https = require('https');

/**
 * @swagger
 * /{film}:
 *   get:
 *     summary: Récupérer des informations sur un film par son titre
 *     parameters:
 *       - name: film
 *         in: path
 *         required: true
 *         description: Le titre du film à rechercher
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations sur le film récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erreur lors de la communication avec l'API externe ou traitement de la requête
 */
router.get('/:film', async (req, res) => {
    try {
        const film = req.params.film;

        // Encodage de l'URL pour échapper les caractères spéciaux comme les espaces
        const encodedFilm = encodeURIComponent(film);

        const optionsFilm = {
            method: 'GET',
            hostname: 'moviesminidatabase.p.rapidapi.com',
            port: null,
            path: `/movie/imdb_id/byTitle/${encodedFilm}/`,
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': process.env.HOST
            }
        };

        const externalReq = https.request(optionsFilm, (externalRes) => {
            const chunks = [];

            externalRes.on('data', (chunk) => {
                chunks.push(chunk);
            });

            externalRes.on('end', () => {
                const body = Buffer.concat(chunks).toString();
                const jsonResponse = JSON.parse(body);
                res.status(200).json(jsonResponse); // Send the response back to the client
            });
        });

        externalReq.on('error', (error) => {
            console.error('Erreur lors de la requête API:', error);
            res.status(500).json({ message: 'Erreur lors de la communication avec l\'API externe' });
        });

        externalReq.end();
    } catch (error) {
        console.error('Erreur lors du traitement de la requête:', error);
        res.status(500).json({ message: 'Erreur lors du traitement de la requête.' });
    }
});

/**
 * @swagger
 * /idFilm/{id}:
 *   get:
 *     summary: Récupérer des informations sur un film par son ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du film à rechercher
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations sur le film récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erreur lors de la communication avec l'API externe ou traitement de la requête
 */
router.get('/idFilm/:id', async (req, res) => {
    try {
        const id = req.params.id.trim();

        const options = {
            method: 'GET',
            hostname: 'moviesminidatabase.p.rapidapi.com',
            port: null,
            path: `/movie/id/${id}/`,
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': process.env.HOST
            }
        };

        const externalReq = https.request(options, (externalRes) => {
            const chunks = [];

            externalRes.on('data', (chunk) => {
                chunks.push(chunk);
            });

            externalRes.on('end', () => {
                const body = Buffer.concat(chunks).toString();
                const jsonResponse = JSON.parse(body);
                res.status(200).json(jsonResponse);
            });
        });

        externalReq.on('error', (error) => {
            console.error('Erreur lors de la requête API:', error);
            res.status(500).json({ message: 'Erreur lors de la communication avec l\'API externe' });
        });

        externalReq.end();
    } catch (error) {
        console.error('Erreur lors du traitement de la requête:', error);
        res.status(500).json({ message: 'Erreur lors du traitement de la requête.' });
    }
});

module.exports = router;
