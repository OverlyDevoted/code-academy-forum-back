const { v4: uuid } = require("uuid");
const answerModel = require("../models/answer");
const answerSchema = require("../schemas/answer");

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

    return res.json(answers);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Could not retrieve answers to questions" });
  }
};
