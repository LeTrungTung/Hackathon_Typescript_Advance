import express from "express";
const router = express.Router();

import multer from "multer";

// import StudentController from '../controller/student.controller';
import StudentController from "../controllers/student.ctl";

// router.get("/:studentId", studentCtl.getById)
router.get("/", StudentController.getMany);

const studentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/student-images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "avatar_" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const studentAvatarUpload = multer({ storage: studentStorage });

// router.post("/", studentAvatarUpload.single('avatar'), studentCtl.createStudent)
// router.delete("/:studentId", studentCtl.deleteStudent)
router.put("/:studentId", StudentController.update);
export default router;
