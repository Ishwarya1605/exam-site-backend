const Topic = require("../models/topic");
const Subject = require("../models/subject");


const createTopic = async (req, res) => {
  try {
    const { subjectId, topic, description } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const newTopic = new Topic({ subject: subjectId, topic, description });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createMultipleTopics = async (req, res) => {
  try {
    const { subjectId, topics } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const topicDocs = topics.map((t) => ({
      subject: subjectId,
      topic: t.topic,
      description: t.description || "",
    }));

    const created = await Topic.insertMany(topicDocs);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTopicsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const topics = await Topic.find({ subject: subjectId });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTopic,
  createMultipleTopics,
  getTopicsBySubject,
};
