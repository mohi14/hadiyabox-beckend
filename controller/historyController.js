const { find } = require("../models/Admin");
const History = require("../models/History");

const getAllHistory = async (req, res) => {
  const history = await History.find({}).sort({ _id: -1 });

  console.log("history", history);
  res.send(history);
};

module.exports = { getAllHistory };
