const express = require("express");
const contactsController = require("../../controllers/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");
const schema = require("../../schemas/contacts");
const  { validateBody }  = require("../../middlewares");

const router = express.Router();

router.get("/", controllerWrapper(contactsController.getAll));

router.get("/:contactId", controllerWrapper(contactsController.getOneById));

router.post(
  "/",
  validateBody(schema.contactSchema),
  controllerWrapper(contactsController.add)
);

router.delete("/:contactId", controllerWrapper(contactsController.removeById));

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  controllerWrapper(contactsController.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateBody(schema.contactUpdateFavoriteSchema),
  controllerWrapper(contactsController.updateById)
);

module.exports = router;
