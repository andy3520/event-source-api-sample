const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.write(
      `data: ${JSON.stringify({
        message: `Random number: ${randomNumber}`,
      })}\n\n`
    );
  };

  const intervalId = setInterval(sendRandomNumber, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
