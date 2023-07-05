import END_POINTS from "../../../constants/endpoints";
import {
  addCourseService,
  addLessonsService,
  getLessonsByCourseService,
  getLessonsByIdService,
} from "../../services/course/courseService";
import { getCoursesByInstructorService } from "../../services/course/courseService";


export const addCourse = (courseInfo: any) => {
  return addCourseService(END_POINTS.ADD_COURSE, courseInfo);
};

export const getCourseByInstructor = () => {
  return getCoursesByInstructorService(END_POINTS.GET_COURSES_BY_INSTRUCTORS);
};

export const getLessonsByCourse = (courseId: string) => {
  return getLessonsByCourseService(END_POINTS.GET_LESSONS_BY_COURSE, courseId);
};

export const addLesson = (courseId: string, lesson: FormData) => {
  return addLessonsService(END_POINTS.ADD_LESSON, courseId, lesson);
};

export const getLessonById = (lessonId:string)=>{
  return getLessonsByIdService(END_POINTS.GET_LESSONS_BY_ID,lessonId)
}