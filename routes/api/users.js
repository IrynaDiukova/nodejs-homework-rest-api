const express = require("express");
const userController = require("../../controllers/users");
const controllerWrapper = require("../../helpers/controllerWrapper");
const schema = require("../../schemas/users");
const {
  validateBody,
  authenticate,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schema.registerSchema),
  controllerWrapper(userController.register)
);
router.post(
  "/login",
  validateBody(schema.loginSchema),
  controllerWrapper(userController.login)
);
router.post(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(userController.logout)
);
router.get(
  "/current",
  controllerWrapper(authenticate),
  controllerWrapper(userController.current)
);

router.patch(
  "/avatars",
  upload.single("avatar"),
  controllerWrapper(authenticate),
  controllerWrapper(userController.uploadAvatar)
);

module.exports = router;
