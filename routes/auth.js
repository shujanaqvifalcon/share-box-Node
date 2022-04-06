/**
 * User auth routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const auth = require("../controllers/auth");
const { checkAuth } = require("../middleware/checkAuth");
const { validateLogin, isValidated } = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user login
 * @method get check auth
 * @method put change password
 * @method post forgot email
 */

// Read
router.post("/login", validateLogin, isValidated, auth.login); // Get all users at once
router.get("/", checkAuth, auth.confirmAuth);

// Export
module.exports = router;
