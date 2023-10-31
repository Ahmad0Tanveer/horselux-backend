const contact = require('../Model/contact.model')

exports.contactPost = async (req, res) => {
  try {
    const { fname, lname, email, phoneNumber, description } = req.body;
    console.log(fname, description);
    const newContact = new contact({
      fname,
      lname,
      email,
      phoneNumber,
      description,
    });
    console.log(fname, description);
    const savedContact = await newContact.save();
    res.status(200).json({ message: 'Post created successfully', newContact: savedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};


exports.contactGet = async (req, res) => {
  try {
    const contacts = await contact.find();
    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
};


exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(id);
    await contact.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
};


exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(id);
    await contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
};