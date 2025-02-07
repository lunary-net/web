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

// Function to generate JSON error response
const generateErrorResponse = (req) => {
    return {
        errorCode: 404,
        errorMsg: "Page not found",
        requestId: req.id || 'N/A'
    };
};

// Middleware to assign a unique request ID
app.use((req, res, next) => {
    req.id = Date.now(); // Simple request ID generation
    next();
});

// Catch-all handler for all requests
app.use((req, res, next) => {
    res.status(404).send(render404(req.originalUrl));
});

// JSON error response for API requests
app.use((req, res) => {
    res.status(404).json(generateErrorResponse(req));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
