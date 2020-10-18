// app.js
const http = require("http"); // 1
const hostname = "127.0.0.1";
const server = http.createServer((request, response) => {
  // 2
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end("Hello World");
});

server.listen(3000, hostname, () => {
  console.log("hello~");
});
console.log("Server running at http://127.0.0.1:3000/");
