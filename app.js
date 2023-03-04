const express = require("express");
const Cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/database");

const app = express();
connectDB();

// Init middleware
app.use(Cors());
app.use(express.json({ extend: false }));
if (process.env === "development") {
  app.use(morgan);
}

app.get("/", (req, res) => {
  res.send(`PRODUCT APP ${new Date()}`);
});

// Handles all errors
app.use((err, req, res, next) => {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("Application-error-logs", err);
      if (err.status === 412) {
        return res
          .status(err.status)
          .send({ success: false, message: err.message });
      }
      return res
        .status(err.status || 400)
        .send({ success: false, message: "An error occur" });
    }
    console.log("Application-error-logs", err);
    return res
      .status(err.status || 400)
      .send({ success: false, message: err.message, err });
  } catch (error) {
    return res
      .status(error.status || 400)
      .send({ success: false, message: error.message });
  }
});

// Not found route
app.use((req, res) => {
  return res.status(404).send({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Environment: ${process.env.NODE_ENV} on port ${process.env.PORT} `
  )
);
