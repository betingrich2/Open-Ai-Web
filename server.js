// backend/server.js
const express = require('express');
const _0x25103f = require('yt-search');
const fetch = require('node-fetch');
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint for searching and downloading songs
app.post('/download', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).send({ error: "Please provide a search query" });
    }

    try {
        const searchResult = await _0x25103f(query);
        const videos = searchResult.videos.slice(0, 5);
        
        if (videos.length === 0) {
            return res.status(404).send({ error: "No results found" });
        }

        // Send video details back to the client
        const response = videos.map(video => ({
            title: video.title,
            videoId: video.videoId,
            thumbnail: video.thumbnail,
            views: video.views,
            timestamp: video.timestamp,
            author: video.author.name,
            link: `https://www.youtube.com/watch?v=${video.videoId}`,
        }));

        res.send(response);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).send({ error: "Error processing your request" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
