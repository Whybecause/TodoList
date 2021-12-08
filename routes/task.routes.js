const controller = require('../controller/task.controller');

module.exports = function(app) {
    app.get('/api/tasks', controller.getTasks);
    app.get('/api/task/:id', controller.getTask);
    app.post('/api/task', controller.addTask);
    app.patch('/api/task/:id', controller.updateTask);
    app.delete('/api/task/:id', controller.deleteTask);
}