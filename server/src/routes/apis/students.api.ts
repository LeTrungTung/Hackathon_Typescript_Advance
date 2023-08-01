import express from 'express';
const router = express.Router();

import multer from 'multer';

import studentCtl from '../../controllers/student.ctl';

router.get("/:studentId", studentCtl.getById)
router.get("/", studentCtl.getMany)


const studentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/student-images')
    },
    filename: function (req, file, cb) {
      cb(null, "avatar_" + Date.now() + "." + file.mimetype.split("/")[1])
    }
  })
  
const studentAvatarUpload = multer({ storage: studentStorage });

router.post("/", studentAvatarUpload.single('avatar'), studentCtl.create)
router.delete("/:studentId", studentCtl.delete)
router.put("/:studentId", studentCtl.update)
export default router;