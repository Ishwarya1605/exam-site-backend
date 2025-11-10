const Question = require("../models/question");
const Topic = require("../models/topic");

const createQuestion = async (req, res) => {
    try {
        const { topicId, question } = req.body;

        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" });
        }

        const newQuestion = new Question({
            topic: topicId,
            question,
        });

        await newQuestion.save();

        res.status(201).json({
            _id: newQuestion._id,
            question: newQuestion.question,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createMultipleQuestions = async (req, res) => {
    try {
        const { topicId, questions } = req.body;
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" });
        }

        const questionDocs = questions.map((q) => ({
            topic: topicId,
            question: q.question,
        }));

        const created = await Question.insertMany(questionDocs);

        const response = created.map((q) => ({
            _id: q._id,
            question: q.question,
        }));

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getQuestionsByTopic = async (req, res) => {
    try {
        const { topicId } = req.params;

        const questions = await Question.find({ topic: topicId }).populate("topic", "topic");

        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this topic" });
        }

        const response = questions.map((q) => ({
            _id: q._id,
            topicName: q.topic.topic,
            question: q.question,
        }));

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getQuestionById = async (req, res) => {
    try {
        const { questionId } = req.params;
        const question = await Question.findById(questionId).populate("topic", "topic");

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(200).json({
            _id: question._id,
            topicName: question.topic.topic,
            question: question.question,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { question} = req.body;

        const updated = await Question.findByIdAndUpdate(
            questionId,
            { question},
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(200).json({
            _id: updated._id,
            question: updated.question,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const deleted = await Question.findByIdAndDelete(questionId);

        if (!deleted) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createQuestion,
    createMultipleQuestions,
    getQuestionsByTopic,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};
