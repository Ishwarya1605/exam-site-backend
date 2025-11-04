const express = require("express");
const router = express.Router();
const {
  createTopic,
  createMultipleTopics,
  getTopicsBySubject
} = require("../controllers/topicController");

router.post("/bulk", createMultipleTopics);
router.post("/", createTopic);    
router.get("/:subjectId", getTopicsBySubject);

module.exports = router;

