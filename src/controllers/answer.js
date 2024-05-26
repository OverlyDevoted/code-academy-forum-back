const { v4: uuid } = require("uuid");
const answerModel = require("../models/answer");
const answerSchema = require("../schemas/answer");
const { object } = require("joi");

module.exports.CREATE_ANSWER = async (req, res) => {
  try {
    const validation = answerSchema.validate({
      ...req.body,
    });
    if (validation.error)
      return res.status(400).json({ message: "Bad body for answer" });

    const { value: answerValue } = validation;
    const answer = new answerModel({
      ...answerValue,
      id: uuid(),
    });
    await answer.save();

    return res.json({ message: "Successfully created answer" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Could not create answer" });
  }
};

module.exports.GET_QUESTION_ANSWERS = async (req, res) => {
  try {
    const { id: question_id } = req.params;
    if (!question_id)
      return res
        .status(400)
        .json({ message: "Bad paramaters for retrieving question answers" });
    const answers = await answerModel
      .aggregate([
        { $match: { question_id } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "id",
            as: "user",
          },
        },
        {
          $project: {
            "user.password": 0,
            "user.email": 0,
          },
        },
      ])
      .exec();
    if (!answers.length)
      return res
        .status(400)
        .json({ message: "There are no answers with this ID" });
    return res.json(answers);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Could not retrieve answers to questions" });
  }
};

module.exports.DELETE_ANSWER = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Answer ID is missing" });

    const { user_id } = req.body;
    if (!user_id)
      return res.status(403).json({ message: "Unauthorized to delete answer" });

    const answer = await answerModel.findOne({ user_id });

    if (answer.user_id !== user_id)
      return res.status(403).json({ message: "Unauthorized to delete answer" });

    await answerModel.deleteOne({ id });

    return res.json({ message: "Successfully deleted answer" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting answer" });
  }
};

module.exports.LIKE_ANSWER = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        message: "Could not like the answer because answer ID is missing",
      });

    const { user_id } = req.body;

    if (!user_id)
      return res.status(400).json({
        message: "Could not like the answer because user ID is missing",
      });

    const { is_like } = req.body;

    if (!req.body.hasOwnProperty("is_like"))
      return res.status(400).json({
        message: 'Could not like the answer because "is_like" is missing',
      });

    const answer = await answerModel.findOne({ id });

    if (!answer)
      return res.status(400).json({
        message:
          "Could not like the answer because there's no answer with such ID",
      });

    const { liked_by, disliked_by } = answer;

    const likeToAdd = is_like ? liked_by : disliked_by;
    let likeToRemove = is_like ? disliked_by : liked_by;
    console.log(likeToAdd, likeToRemove);

    if (likeToAdd.some((user) => user === user_id))
      return res
        .status(400)
        .json({ message: "User has already liked this record" });

    likeToAdd.push(user_id);
    likeToRemove = likeToRemove.filter((user) => user_id !== user);

    await answerModel.updateOne(
      { id },
      {
        liked_by: is_like ? likeToAdd : likeToRemove,
        disliked_by: !is_like ? likeToAdd : likeToRemove,
      }
    );
    return res.json(`Successfully ${is_like ? "liked" : "disliked"} answer`);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Could not like an answer" });
  }
};
