const router = require("express").Router();
const User = require("../models/User");
// const logger = require("../utils/logger");

router.get("", async (request, response) => {
  const users = await User.find({});
  const userRole = request.user.role?.toLowerCase();
  const role = request.query.role?.toLowerCase();

  let filteredList = users?.filter(
    (user) => user.role?.toLowerCase() === role && user.isVerified
  );

  if (role === "tutor") {
    filteredList = users?.filter(
      (user) =>
        user.role?.toLowerCase() === role &&
        user.isVerified &&
        user.isTutorVerified
    );
  }

  if (userRole === "admin") {
    filteredList = users?.filter((user) => user.role?.toLowerCase() === role);
  }

  return response.status(200).json(filteredList);
});

module.exports = router;
