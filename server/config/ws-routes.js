const init = function (server, app) {

  var io = require('socket.io')(server);

  var courseSocketMap = {};
  var courseWS = io.of('/ws/courses/');
  app.set('courseSocketMap', courseSocketMap);
  courseWS.on('connection', function (socket) {
    socket.on('course-to-listen', function (data) {
      let courseId = data;
      if(courseSocketMap[courseId]){
        courseSocketMap[courseId].push(socket)
      }
      else{
        courseSocketMap[courseId] = [socket]
      }
    });

    socket.on('disconnect', function(socket){
      Object.keys(courseSocketMap).forEach(function(courseId) {
        var index = courseSocketMap[courseId].indexOf(socket)
        if (index > -1) {
          courseSocketMap[courseId].splice(index, 1);
        }
      });
    });
  })


  var questionSocketMap = {};
  var questionWS = io.of('/ws/questions/');
  app.set('questionSocketMap', questionSocketMap);
  questionWS.on('connection', function (socket) {
    socket.on('question-to-listen', function (data) {
      let questionId = data;
      if(questionSocketMap[questionId]){
        questionSocketMap[questionId].push(socket)
      }
      else{
        questionSocketMap[questionId] = [socket]
      }
    });

    socket.on('disconnect', function(socket){
      Object.keys(questionSocketMap).forEach(function(questionId) {
        var index = questionSocketMap[questionId].indexOf(socket)
        if (index > -1) {
          questionSocketMap[questionId].splice(index, 1);
        }
      });
    });
  })

}

export default init
