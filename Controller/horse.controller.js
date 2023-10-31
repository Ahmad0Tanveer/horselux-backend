
const addNewHorse = require('../Model/horse.model');
const Service = require("../Model/Services")
exports.addNewHorsePost = async (req, res) => {
  try {
    const { neckName, showName, owner, ownerId, billPayer, billPayerId, bread, color, sex, img, microchip, stallNumber, stallNotes, paddockName, paddockLocation, paddockNotes } = req.body;
    console.log("req.user_id", req.user_id)
    const userId = req.user_id;
    const newaddNewHorse = new addNewHorse({
      neckName,
      showName,
      owner,
      ownerId,
      billPayer,
      billPayerId,
      bread,
      color,
      sex,
      img,
      microchip,
      stallNumber,
      stallNotes,
      paddockName,
      paddockLocation,
      paddockNotes,
      userId
    });
    const savedAddNewHorse = await newaddNewHorse.save();
    res.status(200).json({ message: 'Post created successfully', newaddNewHorse: savedAddNewHorse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

exports.addNewHorseGet = async (req, res) => {
  try {
    const horses = await addNewHorse.find();
    res.status(200).json({ horses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving horses', error: error.message });
  }
};

exports.addNewHorseGetByUserId = async (req, res) => {
  try {
    const userId = req.user_id;
    const horses = await addNewHorse.find({ userId: userId });
    if (!horses || horses.length === 0) {
      return res.status(404).json({ message: 'Horses not found for this user' });
    }
    res.status(200).json({ horses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving horses', error: error.message });
  }
};


exports.updateHorse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedHorse = await addNewHorse.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedHorse) {
      return res.status(404).json({ message: 'Horse not found' });
    }
    res.status(200).json({ message: 'Horse updated successfully', horse: updatedHorse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating horse', error: error.message });
  }
};
// Delete the horse record
exports.deleteHorse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHorse = await addNewHorse.findByIdAndDelete(id);
    if (!deletedHorse) {
      return res.status(404).json({ message: 'Horse not found' });
    }
    await Service.deleteMany({ horseId: id }).then((result) => {
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
      message: err.message,
      error: err.message
    });
  };
};


exports.addNewHorseGetByid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const Hourses = await addNewHorse.find(id);
    if (!Hourses) {
      return res.status(404).json({ message: 'Horse not found' });
    }
    res.status(200).json({ horse: Hourses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting horse', error: error.message });
  }
};

exports.getHorsesByUserId = async (req, res) => {
  try {
    const userId = req.user_id;
    const horses = await addNewHorse.find({ userId });
    if (!horses) {
      res.send({
        error: "Horses Not Found!!!"
      })
    }
    res.status(200).json({ message: 'Horses fetched successfully', horses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching horses', error: error.message });
  }
};




exports.getHorseById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const foundHorse = await Horse.findById(id);
    if (!foundHorse) {
      return res.status(404).json({ message: 'Horse not found' });
    }
    res.status(200).json({ horse: foundHorse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving horse', error: error.message });
  }
};
