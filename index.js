/**
 * Node-JS File Transfer
 * @author Shuja Naqvi
 */
require("dotenv").config();
const app = require("express")();
const port = 8080;
require("./database");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// Middleware
require("./middleware/common")(app);

// API Routes
app.use("/api", require("./routes"));

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});
