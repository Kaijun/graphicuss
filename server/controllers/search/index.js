import express from 'express'
import Course from '../../models/Course.js'

// get all Courses
export const searchCourse = (req, res, next) => {
  let courseCode = req.params.courseCode
  Course.findOne({code: courseCode}).populate('creator').then((course) => {
    if(course){
      res.json(course)
    }
    else{
      res.json()
    }
  }, (err) => {
    res.status(404).json({message: err})
  })
}
