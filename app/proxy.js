const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const response = await fetch("https://api.vercel.com/v1/analytics", {
      headers: {
        Authorization: "Bearer AmEKVKDp6XsTLo57ebqD4OSG",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).send("Error fetching analytics");
  }
};
