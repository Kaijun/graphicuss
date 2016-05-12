import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const courseSchema = mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  name: String,
  desc: String,
  creator : { type: Schema.Types.ObjectId, ref: 'User' },
  deleted : {type: Boolean, default: false},
}, {timestamps: true});

// generating a non-duplicate Code
courseSchema.pre('save', function(next){ // can't use arror function, or this will be undefinded. fat arrow is lexically scoped and prevents .bind().
  let ctx = this
  attempToGenerate(ctx, next)

  function attempToGenerate(ctx, callback) {
    let newCode = shortid.generate()
    ctx.constructor.findOne({'code': newCode}).then((course) => {
      if(course){
        attempToGenerate(ctx, callback)
      }
      else{
        ctx.code = newCode
        next();
      }
    }, (err) => {
      next(err)
    })
  }
})

// methods ======================
// edit a course
courseSchema.method.edit = function(fields) {
  return this.update(fields).exec()
}
// delete a course
courseSchema.method.remove = function() {
  return this.remove().exec()
}

// statics ======================
// get all courses
courseSchema.statics.list = function() {
  return this.find().sort('-createdAt').populate('creator').exec()
}
// get one courses
courseSchema.statics.load = function(_id) {
  return this.findById(_id).populate('creator').exec()
}

export default mongoose.model('Course', courseSchema)
