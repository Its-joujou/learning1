import express from 'express';
import courseController from '../../../adapters/controllers/courseController';
import { courseRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { uploadImageAndVideo } from '../middlewares/imageUpload';

const courseRouter = () => {
  const router = express.Router();
  const controller = courseController( 
    courseDbRepository,
    courseRepositoryMongodb
  );
  //* Add course 
  router.post('/instructors/add-course',uploadImageAndVideo,controller.addCourse)
  return router
};
export default courseRouter
