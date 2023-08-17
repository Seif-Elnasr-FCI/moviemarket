const cors_proxy = require('cors-anywhere');

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || 8000;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log(`CORS Anywhere server running on ${host}:${port}`);
});