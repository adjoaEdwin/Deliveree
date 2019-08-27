import { User } from "../models/user.models";
import { crudControllers } from "../utils/crud";

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const getOne = model => async (req, res) => {
  try {
    const user = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }
    console.log(user);
    res.status(200).json({ data: doc });
    return res.render("users/dashboard", { user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default crudControllers(User);
