const { v4: uuid } = require("uuid");
const questionModel = require("../models/question");
const questionSchema = require("../schemas/question");

module.exports.GET_QUESTIONS = async (req, res) => {
  try {
    const rawQuestions = await questionModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user.password": 0,
          "user.email": 0,
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: "id",
          foreignField: "question_id",
          as: "answers",
        },
      },
      {
        $addFields: {
          numberOfAnswers: {
            $cond: {
              if: { $isArray: "$answers" },
              then: { $size: "$answers" },
              else: "NA",
            },
          },
        },
      },
      {
        $project: {
          answers: 0,
          user_id: 0,
        },
      },
    ]);
    if (!rawQuestions.length)
      return res.status(404).json({ message: "No questions found" });

    const questions = rawQuestions.sort((questionA, questionB) => {
      console.log(questionA);
      return new Date(questionB.createdAt) - new Date(questionA.createdAt);
    });

    return res.json({ questions });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Could not retrieve questions" });
  }
};

module.exports.CREATE_QUESTION = async (req, res) => {
  try {
    const validation = questionSchema.validate({
      ...req.body,
    });
    if (validation.error) {
      console.log(validation.error);
      return res.status(400).json({ message: "Bad body for question" });
    }
    const { value: questionValue } = validation;
    const question = new questionModel({
      ...questionValue,
      id: uuid(),
    });
    await question.save();

    return res.json({ message: "Successfully created question" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Could not create question" });
  }
};

module.exports.GET_USER_QUESTIONS = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    if (!user_id) return res.json(400).json({ message: "Bad message" });
    const questions = await questionModel
      .aggregate([
        {
          $match: {
            user_id,
          },
        },
        {
          $lookup: {
            from: "answers",
            localField: "id",
            foreignField: "question_id",
            as: "answers",
          },
        },
        {
          $addFields: {
            numberOfAnswers: {
              $cond: {
                if: { $isArray: "$answers" },
                then: { $size: "$answers" },
                else: "NA",
              },
            },
          },
        },
        {
          $project: {
            answers: 0,
            user_id: 0,
          },
        },
      ])
      .exec();
    if (!questions.length)
      return res.status(400).json("This user has no questions");

    return res.json(sortedQuestions);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went bad while requestion user questions" });
  }
};
