const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to render the 404 HTML with the URL
const render404 = (url) => {
    let html = fs.readFileSync(path.join(__dirname, '404.html'), 'utf8');
    return html.replace('${URL}', url);
};

// Catch-all handler for all requests
app.use((req, res, next) => {
    res.status(404).send(render404(req.originalUrl));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});