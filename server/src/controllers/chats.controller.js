import Chats from "../models/chats.models.js";
import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHadler.js";
import SuccessHandler from "../utils/successHandler.js";

export const addContact = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!email || !name) {
      return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res
      .status(200)
      .json(new SuccessHandler(200, "Contact found", { user }));
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    if (!users) {
      return next(new ErrorHandler("No contacts found", 404));
    }

    return res
      .status(200)
      .json(new SuccessHandler(200, "All contacts", { users }));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = req.params.id;

    if(!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId and ReceiverId is required", 400));
    }

    const {messages} = req.body;
    if (!messages) {
      return next(new ErrorHandler("Message is required", 400));
    }

    const newMessage = new Chats({
        senderId,
        receiverId,
        messages: messages,
    })

    await newMessage.save()
    return res.status(200).json(new SuccessHandler(200, "Message sent", {data: newMessage}))


  } catch (error) {
    next(error);
  }
};
