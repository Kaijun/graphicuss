import express from 'express'
import modern from 'express-modern'
import {loadUser, isLoggedIn} from '../middleware/authMiddleware'
import {apiConfig} from './index'

import * as AuthCtrl from '../controllers/auth'
import * as SearchCtrl from '../controllers/search'
import * as CourseCtrl from '../controllers/course'
import * as QuestionCtrl from '../controllers/question'
import * as AnswerCtrl from '../controllers/answer'
import * as UploadCtrl from '../controllers/UploadCtrl'
//wrap the api request with prefix '/api/version/***'
const apiRoutes = express.Router();
// const apiRoutesWrapped = express.Router().use(`/${apiConfig.path}/${apiConfig.version}`, apiRoutes);
const apiRoutesWrapped = express.Router().use(`/${apiConfig.path}`, apiRoutes);

apiRoutes.all('*', loadUser)
apiRoutes.post('/auth/login', modern(AuthCtrl.login))
apiRoutes.post('/auth/signup', modern(AuthCtrl.signup))
apiRoutes.get('/auth/logout', modern(AuthCtrl.logout))
apiRoutes.get('/auth/is-logged-in', isLoggedIn, AuthCtrl.isLoggedIn)

apiRoutes.param('courseId', modern(CourseCtrl.load))
apiRoutes.get('/courses', modern(CourseCtrl.allCourses))
apiRoutes.post('/courses', isLoggedIn, modern(CourseCtrl.newCourse))
apiRoutes.get('/courses/:courseId', modern(CourseCtrl.getCourse))
apiRoutes.put('/courses/:courseId', isLoggedIn, modern(CourseCtrl.editCourse))
apiRoutes.delete('/courses/:courseId', isLoggedIn, modern(CourseCtrl.delCourse))
apiRoutes.post('/courses/:courseId/toogle-subscribe', isLoggedIn, modern(CourseCtrl.toggleSubscription))

apiRoutes.param('questionId', modern(QuestionCtrl.load))
apiRoutes.get('/questions', modern(QuestionCtrl.allQuestions))
apiRoutes.post('/questions', isLoggedIn, modern(QuestionCtrl.newQuestion))
apiRoutes.get('/questions/:questionId', modern(QuestionCtrl.getQuestion))
apiRoutes.put('/questions/:questionId', isLoggedIn, modern(QuestionCtrl.editQuestion))
apiRoutes.delete('/questions/:questionId', isLoggedIn, modern(QuestionCtrl.delQuestion))
apiRoutes.post('/questions/:questionId/vote/:voteType', isLoggedIn, modern(QuestionCtrl.voteQuestion))
apiRoutes.post('/questions/:questionId/favor', isLoggedIn, modern(QuestionCtrl.favQuestion))

apiRoutes.param('answerId', modern(AnswerCtrl.load))
apiRoutes.get('/answers', modern(AnswerCtrl.allAnswers))
apiRoutes.post('/answers', isLoggedIn, modern(AnswerCtrl.newAnswer))
apiRoutes.get('/answers/:answerId', modern(AnswerCtrl.getAnswer))
apiRoutes.put('/answers/:answerId', isLoggedIn, modern(AnswerCtrl.editAnswer))
apiRoutes.delete('/answers/:answerId', isLoggedIn, modern(AnswerCtrl.delAnswer))
apiRoutes.post('/answers//:answerId/vote/:voteType', isLoggedIn, modern(AnswerCtrl.voteAnswer))

apiRoutes.get('/search/course/:courseCode', isLoggedIn, modern(SearchCtrl.searchCourse))





apiRoutes.post('/upload-avatar', modern(UploadCtrl.uploadAvatar))
apiRoutes.post('/upload-file', modern(UploadCtrl.uploadFile))


// Default Error Handling
apiRoutes.use((err, req, res, next) => {
  res.status(500).json(err);
})

// normal router without prefix
const routes = express.Router()
routes.use('/test', function (req, res) {
    res.send('test')
})

export { apiRoutesWrapped as apiRoutes, routes}
