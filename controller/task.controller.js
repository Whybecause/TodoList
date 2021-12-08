const Task = require("../model/task.model");

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch (err) {
        res.json(null);
    }
};

exports.getTask = async (req, res) => {
    Task.findOne({ _id: req.params.id }).then((task) => {
        res.json(task);
    }).catch(() => {
        res.json(null);
    });
};

exports.addTask = async (req, res) => {
    const data = req.body ? req.body : {};
    try {
        const task = new Task({
            title: data.title,
            author: data.author
        });
        task.save();
        res.json(task);
    } catch (err) {
        res.json(null);
    }
};

exports.updateTask = async (req, res) => {
    const data = req.body ? req.body : {};
    try {
        Task.findById({_id: req.params.id })
        .then(task => {
            task.status = data.status;
            task.save(err => {
                if (err) {
                    console.log(err);
                }
               return res.json({})
            })
        });
    } catch(err) {
        res.json('Fail to save');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id});
        res.json({});
    } catch(err) {
        res.json(null);
    }
};

