require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Environment: ${process.env.NODE_ENV} on port ${process.env.PORT} `
  )
);
