const { find } = require("../models/Admin");
const History = require("../models/History");

const getAllHistory = async () => {
  const history = await History.find({}).sort({ _id: -1 });
  res.send(history);
};

module.exports = { getAllHistory };
