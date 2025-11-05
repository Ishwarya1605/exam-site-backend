const express = require("express");
const router = express.Router();
const {
  createTopic,
  createMultipleTopics,
  getTopicsBySubject,
  getTopic
} = require("../controllers/topicController");

router.post("/bulk", createMultipleTopics);
router.post("/", createTopic);
router.get("/:subjectId", getTopicsBySubject);
router.get("/topic/:topicId", getTopic);

module.exports = router;

