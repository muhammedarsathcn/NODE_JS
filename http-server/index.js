const fs = require("fs");
const http = require("http");
//server creation
const server = http.createServer((req, res) => {
  if (req.url === "/colors" && req.method === "GET") {
    fs.readFile("color_ palette.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Error in reading the file" }));
      }
      const colors = JSON.parse(data);
      const shuffledColors = colors.sort(() => 0.5 - Math.random()).slice(0,5)
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Random five colors",
          data: shuffledColors,
        }),
      );
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Route not found. Use /colors",
      }),
    );
  }
});
//server listening
server.listen(3000, () => {
  console.log("Server is listening in http://localhost:3000");
});
