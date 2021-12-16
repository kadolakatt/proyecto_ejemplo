const ProjectsController = require('./ProjectsController');
const UsersController = require('./UsersController');

exports.setUpControllers = (app) => {
    app.use('/projects/', ProjectsController);
    app.use('/users/', UsersController);
}