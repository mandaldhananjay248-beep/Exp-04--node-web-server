const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

app.get('/', (request, response) => {
  response.sendFile(path.join(publicDirectory, 'index.html'));
});

app.get('/about', (request, response) => {
  response.sendFile(path.join(publicDirectory, 'about.html'));
});

app.get('/contact', (request, response) => {
  response.sendFile(path.join(publicDirectory, 'contact.html'));
});

app.use(express.static('public'));

app.use((request, response) => {
  response.status(404).sendFile(path.join(publicDirectory, '404.html'));
});

app.listen(port, () => {
  console.log(`NodeServe is running at http://localhost:${port}`);
});