const { find } = require("../models/Admin");
const History = require("../models/History");

const getAllHistory = async (req, res) => {
  const history = await History.find({}).sort({ _id: -1 });

  console.log("history", history);
  res.send(history);
};

const getUserHistory = async (req, res) => {
  try {
    const result = await History.find({ user: req.params.id });
    // console.log(result, "resu");
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: 500,
    });
  }
};

const deleteAllHistory = async (req, res) => {
  try {
    const result = await History.deleteMany({});
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = { getAllHistory, getUserHistory, deleteAllHistory };
