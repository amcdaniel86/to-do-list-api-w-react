const express = require('express');
const router  = express.Router();
const Task = require('../models/Task');
// import the Task model so we can do Task.find etc.

/* GET home page */
router.get('/tasks', (req, res, next) => {
  // remember this route is actually /api/tasks because we prefixed this entire file with /api.
  // in app.js line 58

    Task.find()
      .then((allTheTasks)=>{

          res.json(allTheTasks)
// only thing we will do in this app is res.json, since this is an api, we will not be doing res.render or res.redirect.
// res.json instead and we will have to be sure we grab all the .json from the react side.

      })
      .catch((err)=>{

        res.json(err);
      })



});


  router.get('/task-details/:id', (req, res, next)=>{
    // since we're making this route unique, putting details in it, it is not necessary to put this route at the bottom of the file.

      Task.findById(req.params.id)
// anytime id is needed, use req.params.id inside the function argument. Use it to find task in the database.
          .then((theTask)=>{
              res.json(theTask);
              // then render json for all the info about the task.
          })

          .catch((err)=>{
              res.json(err);
          })
  })




// in an express app, usually to create a new Task or edit task, process involves
// we usually have a get route where user sees a form to fill in information.
// then that form will submit to a post route where we receive that informmation then create a
// however with an api with intention of a react front-end, we only need 1 route, the post route.
// because the get route is used to show an hbs file. instead the form the user will fill out, will appear in the react app, and we will have to design the react app so it can successfully make a post request using axios to the post route we are about to define.

    router.post('/tasks/add-new', (req, res, next)=>{
        Task.create({
          title: req.body.theTitle,
          // it'll be our responsibility, to be sure when making our react app, we design a page that gives user ability to make a post request to https://localhost:3000/api/tasks/add-new, and have to be sure that when we send the request from our react app, there are 2 things in body of request. they have to be called theTitle and theDescription.
          // this will be done with axios.
          description: req.body.theDescription
          // req.body. has to match inside the axios route in react. can be anything, my choice.
        })
        .then((response)=>{
          res.json(response)
        })
        .catch((err)=>{
          res.json(err);
        })

    })

      router.post('/tasks/edit/:id', (req, res, next)=>{

        Task.findByIdAndUpdate(req.params.id, {
            title: req.body.theTitle,
            description: req.body.theDescription
        })
        .then((response)=>{
            if(response === null){
              res.json({message: 'sorry we couldnt find the task'})
              return;
            }
            // if there isn't an error, and we can't find a task with that id, then we can do an if statement saying response === null give a message.
            // because this situation will not result in an actual error.
              res.json([{message: 'this task has been successfully updated'}, response )]
            }
          // res.json needs to take an array or object as the argument.
          // you can also put your own message in there as well.
          // pass in object or array for .json, to show a message.
        })
        .catch((err)=>{
          res.json(err.message);
        })


      })



      router.post('/tasks/delete/:id', (req, res, next)=>{

         Task.findByIdAndRemove(req.params.id)
          .then(()=>{
            if(deletedTask === null){
              res.json({message: 'sorry the task could not be found'})
              // res.json takes an object - err, or a custom one do {message: for example}
              return;
            }

            res.json([
              {message: 'task successfully deleted'},
              deletedTask
            ])
          })
          .catch((err)=>{
            res.json(err);
          })



      })







module.exports = router;

// second step is to make router file.

// postman is used to test the api we're in the middle of building.

// enter route into top bar for postman, and add keys and test and see if in browser that a new json object is added

// cross origin request security - cors needs to be installed as well.