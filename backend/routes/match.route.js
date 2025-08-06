import express from 'express';
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  joinMatch,
  leaveMatch,
} from '../controllers/match.controller.js';
import userMiddleware from '../middleware/user.middleware.js';
import upload from '../middleware/upload.middleware.js';


const router = express.Router();

router.post(
  '/create',
  userMiddleware, // your auth middleware
  upload.single('image'), // multer middleware
  createMatch // your controller
); // Image upload
router.get('/', getAllMatches);
router.get('/:id', getMatchById);
router.put('/:id', userMiddleware, updateMatch);
router.delete('/:id', userMiddleware, deleteMatch);
router.post('/:id/join', userMiddleware, joinMatch);
router.post('/:id/leave', userMiddleware, leaveMatch);

export default router;
