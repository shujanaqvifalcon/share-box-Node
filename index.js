/**
 * Node-JS File Transfer
 * @author Shuja Naqvi
 */
require("dotenv").config();
const app = require("express")();
const port =8080;
require("./database");

// Middleware
require("./middleware/common")(app);

// API Routes
app.use("/api", require("./routes"));

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});
