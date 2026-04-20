import fs from "fs";
import http from "http";
import {  SERVER_PORT } from "./configs/env.config.js";


//creating a HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/colors" && req.method === "GET") {
    fs.readFile("./data/color_ palette.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Error in reading the file" }));
      }
      const colors = JSON.parse(data);
      const shuffledColors = colors.sort(() => 0.5 - Math.random());
      const fiveShuffledColors = shuffledColors.slice(0, 5);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Random five colors",
          data: fiveShuffledColors,
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
const PORT = SERVER_PORT;
server.listen(PORT,"localhost", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
