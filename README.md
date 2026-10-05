# Experiment 4 — NodeServe

A modern interactive Node.js and Express.js static web server developed as part of Experiment 4.

## AIM

To develop a basic Node.js server to deliver static HTML pages.

## Overview

This project demonstrates how Node.js and Express.js can be used to create a web server capable of delivering static HTML, CSS, and JavaScript files. It contains three main pages: Home, About, and Contact.

The interface is designed to be modern, responsive, and interactive while keeping the implementation based on Node.js, Express.js, HTML, CSS, and Vanilla JavaScript. The contact form is a frontend-only validation demo and does not send or store data.

## Tech Stack

- Node.js
- Express.js
- HTML5
- CSS3
- Vanilla JavaScript
- npm

## Features

- Express.js static file serving
- Multiple HTML pages
- Express routing
- Responsive design and modern UI
- Light/dark theme with a persistent theme preference
- Responsive mobile navigation
- Interactive server status check
- Scroll reveal animations
- Animated counters
- Frontend contact form validation
- Custom 404 error page
- Separate HTML, CSS, and JavaScript files

## Project Structure

```text
experiment-4-node-server/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── public/
        ├── 404.html
        ├── about.html
        ├── contact.html
        ├── index.html
        ├── css/
        │   └── style.css
        └── js/
                └── script.js
```

## How It Works

The request flow is:

```text
Browser
    ↓
HTTP Request
    ↓
Node.js
    ↓
Express.js
    ↓
public/
    ↓
HTML / CSS / JavaScript
    ↓
Browser
```

Node.js runs the server process. Express.js handles the URL routes and returns the corresponding HTML page. The middleware `app.use(express.static('public'));` makes files in the `public` directory available as static assets. When the browser receives an HTML page, it requests that page's CSS, JavaScript, and any other assets from the same directory.

## Routes

| Method | Route | Response |
| --- | --- | --- |
| GET | `/` | Home page |
| GET | `/about` | About page |
| GET | `/contact` | Contact page |
| Any unmatched route | Other paths | Custom 404 page with an HTTP 404 response |

## Installation

1. Clone the repository:

     ```bash
     git clone https://github.com/mandaldhananjay248-beep/Exp-04--node-web-server.git
     ```

2. Open the project folder:

     ```bash
     cd Exp-04--node-web-server
     ```

3. Install dependencies:

     ```bash
     npm install
     ```

## Running the Project

Start the server:

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in a browser. The server uses port `3000` by default and can use a different port through the `PORT` environment variable.

## Development

Run the development script:

```bash
npm run dev
```

This script starts the same Node.js server.

## Error Handling

If a requested route does not match a known page, Express returns the custom `public/404.html` page with HTTP status `404`.

## Experiment Result

The Node.js and Express.js server was successfully developed and tested. It delivers multiple static HTML pages and their associated CSS and JavaScript assets through Express routes. Valid routes return successfully, while unknown routes are handled using a custom 404 page.

## Learning Outcome

This experiment demonstrates:

- Node.js server creation
- Express.js setup
- Static file serving
- HTTP routing
- Client-server request handling
- Basic error handling
- Frontend integration with a Node.js server

## Author

Dhananjay Mandal

Experiment 4 — Node.js Web Server
GitHub Repository: https://github.com/mandaldhananjay248-beep/Exp-04--node-web-server
