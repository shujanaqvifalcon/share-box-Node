/**
 * User CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const users = require("../controllers/users");
const { validateUser, isValidated } = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

// Create - User Signup
router.post("/", validateUser, isValidated, users.create);
//get
router.get("/:userId", users.getById); // Get one user by it's id
//logout
router.post("/logout", users.logout); //logout

//logout

// Export
module.exports = router;
