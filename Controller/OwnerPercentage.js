 
const ownerPercentage = require('../Model/OwnerPercentageModel');
const newOnwerGroupSchema = require('../Model/newOnwerGroup');


exports.ownerPercenagePost = async (req, res) => {
  try {
    

    const contacts = await addContact.find();
    const { owner, percentage } = req.body;
    const contactId = contacts[0]._id; // Ensure you have the contactId available in your request
    console.log(contactId);
    // console.log("req.user_id", req.user_id)
    // Access the decoded user ID from the req object
    const ownerId = req.body.ownerId;
    console.log("the owner id is",ownerId)
    const ownerPercent = new ownerPercentage({
      contactId, // Store the reference to addContact
      ownerId,
      owner,
      percentage,
    });

    const savedOwnerPercentage = await ownerPercent.save();

    res.status(200).json({ message: 'Owner percentage created successfully', ownerPercentage: savedOwnerPercentage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating owner percentage', error: error.message });
  }
};


exports.ownerPercentGet = async (req, res) => {
  try {
    const ownerPercent = await ownerPercentage.find();
    res.status(200).json({ ownerPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving horses', error: error.message });
  }
};

// exports.addNewHorseGetByUserId = async (req, res) => {
//   try {
//     const userId = req.user_id;

//     const horses = await addNewHorse.find({ userId: userId }); // Find horses with the specific userId

//     if (!horses || horses.length === 0) {
//       return res.status(404).json({ message: 'Horses not found for this user' });
//     }

//     res.status(200).json({ horses });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error retrieving horses', error: error.message });
//   }
// };


// exports.updateHorse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Update the horse record
//     const updatedHorse = await addNewHorse.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedHorse) {
//       return res.status(404).json({ message: 'Horse not found' });
//     }

//     res.status(200).json({ message: 'Horse updated successfully', horse: updatedHorse });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error updating horse', error: error.message });
//   }
// };
//    // Delete the horse record
// exports.deleteHorse = async (req, res) => {
//   try {
//     const { id } = req.params;

 
//     const deletedHorse = await addNewHorse.findByIdAndDelete(id);

//     if (!deletedHorse) {
//       return res.status(404).json({ message: 'Horse not found' });
//     }

//     res.status(200).json({ message: 'Horse deleted successfully', horse: deletedHorse });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error deleting horse', error: error.message });
//   }
// };


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

    if(!horses){
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

    const foundHorse = await Horse.findById(id); // Use "findById" to find a document by its ID

    if (!foundHorse) {
      return res.status(404).json({ message: 'Horse not found' });
    }

    res.status(200).json({ horse: foundHorse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving horse', error: error.message });
  }
};






