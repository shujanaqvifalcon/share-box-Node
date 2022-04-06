/**
 * Files Files routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const files = require("../controllers/files");
const { upload } = require("../middleware/multer");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

// Create - User Signup
router.post("/", upload.array("files"), files.create);
//get
router.get("/:fileId", files.getById); // Get one user by it's id
//post
router.post("/ibox", files.myBox); // Get one user by it's id
//deleteFile
router.post("/deleteBox",files.deleteBox)
//deleteMany
router.put("/deleteMany", files.deleteFiles);
//Update Box
router.post("/updateBox",upload.array("files"),files.updateBox)

// Export
module.exports = router;
