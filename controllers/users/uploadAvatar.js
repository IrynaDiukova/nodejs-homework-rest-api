const User = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");


const uploadAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;

  const avatarImg = await Jimp.read(tempUpload)
  avatarImg.resize(250, 250).quality(85).write(tempUpload)

  const { _id } = req.user;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({avatarURL});
};


module.exports = uploadAvatar;
