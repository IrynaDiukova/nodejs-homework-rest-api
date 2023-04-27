const express = require("express");

const contactsController = require('../../controllers/contacts')

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getOneById);

router.post("/", contactsController.add);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", contactsController.updateById);


module.exports = router;
