
const newMedSchema = require('../Model/newMed');
exports.newMedPost = async (req, res) => {
  try {
    const { med_name, drug_name } = req.body;
    const userId = req.user_id;
    console.log("req.user_id", req.user_id)
    const newMed = new newMedSchema({
      med_name,
      drug_name,
      userId
    });
    const savedNewMed = await newMed.save();
    res.status(200).json({ message: 'Post created successfully', newMed: savedNewMed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.newMedGet = async (req, res) => {
  try {
    const newMed = await newMedSchema.find();
    res.status(200).json({ newMed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving new events' });
  }
};

exports.medGetByUserId = async (req, res) => {
  try {
    const userId = req.user_id;
    const med = await newMedSchema.find({ userId: userId }); // Find horses with the specific userId
    if (!med || med.length === 0) {
      return res.status(404).json({ message: 'med not found for this user' });
    }
    res.status(200).json({ med });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving med', error: error.message });
  }
};

