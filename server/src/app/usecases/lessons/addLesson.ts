import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CreateLessonInterface } from '../../../types/lesson';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
import { QuizDbInterface } from '@src/app/repositories/quizDbRepository';
import { LessonDbRepositoryInterface } from '@src/app/repositories/lessonDbRepository';
import * as ffprobePath from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';

export const addLessonsU = async (
  media: Express.Multer.File[] | undefined,
  courseId: string | undefined,
  instructorId: string | undefined,
  lesson: CreateLessonInterface,
  lessonDbRepository: ReturnType<LessonDbRepositoryInterface>,
  cloudService: ReturnType<CloudServiceInterface>,
  quizDbRepository: ReturnType<QuizDbInterface>
) => {
  console.log(media);
  console.log(lesson);
  if (!courseId) {
    throw new AppError(
      'Please provide a course id',
      HttpStatusCodes.BAD_REQUEST
    );
  }

  if (!instructorId) {
    throw new AppError(
      'Please provide an instructor id',
      HttpStatusCodes.BAD_REQUEST
    );
  }

  if (!lesson) {
    throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
  }

  if (media) {
    const videoFile = media[0];
    // Save the buffer to a temporary file
    const tempFilePath = './temp_video.mp4';
    fs.writeFileSync(tempFilePath, videoFile.buffer);

    // Wrap the ffprobe call inside a Promise
    const getVideoDuration = () =>
      new Promise<string>((resolve, reject) => {
        ffmpeg(tempFilePath)
          .setFfprobePath(ffprobePath.path)
          .ffprobe((err: Error | null, data: any) => {
            // Clean up the temporary file after the ffprobe operation is done
            fs.unlinkSync(tempFilePath);

            if (err) {
              console.error('Error while probing the video:', err);
              reject(err);
            }

            // The duration will be in the format 'HH:mm:ss.SSS'
            const duration: string = data.format.duration;
            console.log('Video Duration:', duration);
            resolve(duration);
          });
      });

    try {
      // Call the getVideoDuration function and wait for the result
      const videoDuration = await getVideoDuration();
      lesson.duration=parseFloat(videoDuration)
      // You can now use the videoDuration variable as needed
      console.log('Video Duration:', videoDuration);
    } catch (error) {
      console.error('Error while getting video duration:', error);
    }
  }

  if (media) {
    lesson.media = await Promise.all(
      media.map(async files => await cloudService.upload(files))
    );
  }
  const lessonId = await lessonDbRepository.addLesson(
    courseId,
    instructorId,
    lesson
  );
  if (!lessonId) {
    throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
  }
  const quiz = {
    courseId,
    lessonId: lessonId.toString(),
    questions: lesson.questions
  };
  await quizDbRepository.addQuiz(quiz);
};
