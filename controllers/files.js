/**
 * User CRUD controllers
 * @author Shuja Naqvi
 */
const Users = require("../models/Users");
const Files = require("../models/Files");
const download = require("image-downloader");
/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let preFiles = await Files.find().sort({ createdAt: -1 }).limit(1);
    if (preFiles.length < 1) {
      req.body.number = 111;
    } else {
      req.body.number = parseInt(preFiles[0].number) + 1;
    }
    req.body.letter = makeletter(3);
    if (req.files != undefined && req.files.length != 0) {
      req.body.files = req.files.map((file) => ({
        file: file.path,
      }));
    }
    let FilesDb = await Files.create(req.body);
    return res.json({ success: true, FilesDb }); //Success
    // Done
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get iBox by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const fileId = req.params.fileId; // Getting user id from URL parameter
    let val = fileId.match(/.{1,3}/g);
    const file = await Files.findOne({ letter: val[0], number: val[1] }); // Finding user by id
    if (file) {
      return res.json({ success: true, file }); // Success
    } else {
      return res.json({ success: false, message: "Not Found" }); // Success
    }
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get box by id
 * @param {object} req
 * @param {object} res
 */
exports.myBox = async (req, res) => {
  try {
    const userId = req.body.userId; // Getting user id from URL parameter
    const FilesDb = await Files.find({ user: userId }); // Finding user by id
    if (FilesDb) {
      return res.json({ success: true, FilesDb }); // Success
    } else {
      return res.json({ success: false, message: "Not Found" }); // Success
    }
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    let FilesDb = await Files.findOneAndUpdate(
      { files: { $elemMatch: { _id: fileId } } },
      { $pull: { files: { _id: fileId } } },
      { new: true }
    );
    if (FilesDb) {
      if (FilesDb.files.length < 1) {
        FilesDb = await Files.findByIdAndDelete(FilesDb._id);
      }
      FilesDb = await Files.find({ user: FilesDb.user });
      return res.json({ success: true, FilesDb }); // Success
    } else {
      return res.json({ success: false, message: "File not deleted" }); // Success
    }
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//delete Many
exports.deleteFiles = async (req, res) => {
  try {
    const files = req.body.files;
    const { id } = req.body;
    let FilesDb;
    for (let i = 0; i < files.length; i++) {
      FilesDb  = await Files.findByIdAndUpdate(
        id,
        { $pull: { files: { file: files[i] } } },
        { new: true }
      );
      if (FilesDb) {
        if (FilesDb.files.length < 1) {
          FilesDb = await Files.findByIdAndDelete(FilesDb._id);
        }
      } else {
        return res.json({ success: false, message: "File not deleted" }); // Success
      }
    }
    return res.json({ success: true, FilesDb }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.download = async (req, res) => {
  try {
    let url = `http://localhost:5001/${req.body.e}`;
    console.log(url, "e");
    let filename = req.body.url;
    const options = {
      url: url,
      dest: "./uploads", // will be saved to /path/to/dest/image.jpg
    };

    download
      .image(options)
      .then(({ filename }) => {
        console.log("Saved to", filename); // saved to /path/to/dest/image.jpg
      })
      .catch((err) => console.error(err));
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteBox = async (req, res) => {
  try {
    const { id } = req.body;
      let FilesDb = await Files.findByIdAndDelete(
        id,
      );
      FilesDb = await Files.find({ user: FilesDb.user });
      return res.json({ success: true, FilesDb }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateBox = async (req, res) => {
  try {
    const { letteralbum,numberalbum } = req.body;
    if (req.files != undefined && req.files.length != 0) {
      req.body.files = req.files.map((file) => ({
        file: file.path,
      }));
    }
      let file = await Files.findOneAndUpdate({number:numberalbum,letter:letteralbum},{$push:{files:req.body.files}},{new:true});
      return res.json({ success: true, file }); // Success 
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Generate Number
const makeletter = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



