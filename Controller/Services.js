const Services = require('../Model/Services');

exports.Name = async (req, res) => {
    try {
        const dateString = req.body.date;
        const next = req.body.nextDate;
        const targetDate = new Date(dateString.split(' ')[0]);

        req.body.date = targetDate;
        if (next === "null") {

        } else {
            const targetNextDate = new Date(next.split(' ')[0]);
            req.body.nextDate = targetNextDate;
        }
        const services = new Services(req.body);
        services.save().then((resuls) => {
            res.status(200).send({
                "messafe": "added",
                "services": resuls
            });
        })
    } catch (err) {
        res.send({
            // "services": "Some thing went wrong",
            "message": err.message
        });
    };



};

exports.getById = (req, res) => {
    console.log(req.params);
    try {
        const id = req.params.id;
        Services.find({ "horseId": id }).then((users) => {
            res.status(200).send(users);
        })
    } catch (err) {
        res.send({
            "message": err.message
        });
    };
};

exports.RemoveById = (req, res) => {
    try {
        const serviceId = req.params.id;
        Services.findByIdAndRemove(serviceId)
            .then((result) => {
                if (result) {
                    res.status(200).send({
                        message: 'Service deleted successfully',
                        deletedService: result
                    });
                } else {
                    res.status(404).send({
                        message: 'Service not found'
                    });
                }
            })
    } catch (err) {
        res.status(500).send({
            message: 'Error deleting service',
            error: err.message
        });
    };
};


exports.update = (req, res) => {
    let id = req.params.id;
    Services.findByIdAndUpdate(id, req.body).then((_) => {
        res.send({
            "message": "Updated Successfully"
        });
    }).catch((err) => {
        res.send({
            "message": err.message
        });
    });
};