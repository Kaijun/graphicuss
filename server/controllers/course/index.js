import Course from '../../models/Course.js'
import User from '../../models/User.js'

// get all Courses
export const load = async (req, res, next, id) => {
  let course = await Course.load(id)
  req.course = course
  return next()
}
// get all Courses
export const allCourses = async (req, res, next) => {
  let courses = await Course.list()
  res.json(courses)
}

// new single Course
export const newCourse = (req, res, next) => {
  if(req.user.tutor===true){
    Course.create({
      name: req.body.name || '',
      desc: req.body.desc || '',
      creator: req.user._id,
    }).then((course) => {
      return Course.populate(course, {path:"creator"})
    }, (err) => {
      res.status(404).json({message: err})
    }).then((coursePopulated) => {
      res.json(coursePopulated.toObject())
    }, (err) => {
      res.status(404).json({message: err})
    })
  }
  else{
    res.status(403).json({message: "Permission denied! You have no Permission to create a Course"})
  }
}

// get single Course
export const getCourse = (req, res, next) => {
  res.json(req.course.toObject())
}

export const editCourse = async (req, res, next) => {
  let course = await req.course.edit({
    name: req.body.name || '',
    desc: req.body.desc || '',
  })
  res.json(course.toObject())
}

export const delCourse = async (req, res, next) => {
  let course = await req.course.remove()
  res.json(course.toObject())
}

export const toggleSubscription = async (req, res, next) => {
  let userModel = await User.findById(req.user._id)
  let u = await userModel.toggleSubscription(req.course._id)
  // TODO update token?
  console.log(u)
  res.json(u)
}
