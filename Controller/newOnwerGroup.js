const newOnwerGroupSchema = require('../Model/newOnwerGroup');
const addContact = require('../Model/contact.model');


exports.newOnwerGroupPost = async (req, res) => {
  try {
    const { name, add_group_member, usef_number, comment, _id } = req.body;

    const userId = req.user_id; // Assuming req.contactId contains the contact ID
    console.log("req.userId", userId)

    const newOnwerGroup = new newOnwerGroupSchema({
      _id,
      name,
      add_group_member,
      usef_number,
      comment,
      contactId,
      userId
    });
    const G_ID = newOnwerGroup._id

    const savedOnwerGroup = await newOnwerGroup.save();

    res.status(200).json({ message: 'Post created successfully', newOnwerGroup: savedOnwerGroup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};



exports.addContactGet = async (req, res) => {
  try {
    const newOnwerGroup = await newOnwerGroupSchema.find();
    res.status(200).json({ newOnwerGroup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
};


