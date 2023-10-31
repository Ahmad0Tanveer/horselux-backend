const addContact = require('../Model/contact.model');

exports.addContactPost = async (req, res) => {
  try {
    const { contact_type, title, first_name, last_name, primary_phone, email } = req.body;
    console.log(req.user_id)
    const userId = req.user_id;
    const newaddContact = new addContact({
      contact_type,
      title,
      first_name,
      last_name,
      primary_phone,
      email,
      userId
    });
    const savedaddContact = await newaddContact.save();
    res.status(200).json({ message: 'Post created successfully', newaddContact: savedaddContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};


exports.addContactGet = async (req, res) => {
  try {
    const contacts = await addContact.find();
    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
};



exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    const updatedContact = await addContact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated successfully', updatedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
};


exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await addContact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully', deletedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

exports.addContactGetByUserId = async (req, res) => {
  try {
    const userId = req.user_id;
    console.log(userId)
    const contact = await addContact.find({ userId: userId });
    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: 'Contacts not found for this user' });
    }
    res.status(200).json({ contact: contact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving horses', error: error.message });
  }
};



