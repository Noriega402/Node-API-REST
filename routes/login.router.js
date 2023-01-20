const express = require("express");
const router = express.Router();

router.get('/signup', (request, response) => {
  response.writeHead(200, {'Content-Type':'text/html'});
  response.write('<h1>Login</h1>');
});

router.get('/signout', (request, response) => {
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write('<h1>Sign Out</h1>');
});

// http://localhost:3000/login/test@gmail.com/daniel/noriega
router.get('/:email/:name/:surname', (request, response) => {
  const { email, name, surname } = request.params;
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write(`<h1>Welcome ${name} ${surname}</h1>`);
  response.write(`<p>Your email is <strong>${email}</strong></p>`);
});

module.exports = router;
