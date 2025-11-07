const express = require("express");
const router = express.Router();
const {
  createTopic,
  createMultipleTopics,
  getTopicsBySubject,
  getTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");

router.post("/bulk", createMultipleTopics);
router.post("/", createTopic);
router.get("/:subjectId", getTopicsBySubject);
router.get("/topic/:topicId", getTopic);
router.put("/:topicId", updateTopic);
router.delete("/:topicId", deleteTopic);

module.exports = router;

