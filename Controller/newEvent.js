const newEventSchema = require('../Model/NewEvent');

exports.newEventPost = async (req, res) => {
  try {
    const { event_type, description, horses, participant, admin_by, start, end, comment, color, services } = req.body;

    const newEvent = new newEventSchema({
      event_type,
      description,
      horses,
      participant,
      admin_by,
      start,
      end,
      comment,
      color,
      services, // Use the 'services' data from req.body directly
    });

    const savedNewEvent = await newEvent.save();

    res.status(200).json({ message: 'Post created successfully', newEvents: savedNewEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.newEventGet = async (req, res) => {
  try {
    const newEvents = await newEventSchema.find();
    res.status(200).json({ newEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving new events' });
  }
};

