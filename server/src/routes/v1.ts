import express from 'express';
const router = express.Router();

import studentApi from './apis/students.api';
router.use("/students", studentApi);

export default router;