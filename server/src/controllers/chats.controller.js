import Chats from "../models/chats.models.js";
import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHadler.js";
import SuccessHandler from "../utils/successHandler.js";

export const addContact = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { username, email } = req.body;

    if (!email || !username) {
      return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const contactUser = await User.findOne({ email }).select([
      "-password",
      "-googleId",
      "-githubId",
      "-isAdmin",
      "-createdAt",
      "-updatedAt",
    ]);

    if (!contactUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (contactUser._id.toString() === userId) {
      return next(
        new ErrorHandler("You cannot add yourself as a contact", 400)
      );
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ErrorHandler("Current user not found", 404));
    }

    const alreadyInContacts = currentUser.contacts.some(
      (contactId) => contactId.toString() === contactUser._id.toString()
    );

    if (alreadyInContacts) {
      return next(new ErrorHandler("Contact already exists", 400));
    }

    currentUser.contacts.push(contactUser._id);
    await currentUser.save();

    return res
      .status(200)
      .json(new SuccessHandler(200, "Contact added successfully", { contactUser }));
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const users = await User.findById(userId)
      .select("-password -googleId -githubId -isAdmin -createdAt -updatedAt")
      .populate("contacts", "-password -googleId -githubId -isAdmin -createdAt -updatedAt");

    console.log(users);

    if (!users) {
      return next(new ErrorHandler("No contacts found", 404));
    }

    return res
      .status(200)
      .json(new SuccessHandler(200, "All contacts", { contacts: users.contacts }));
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { contactId } = req.params;

    if (!contactId) {
      return next(new ErrorHandler("Contact ID is required", 400));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const contactExists = user.contacts.some(
      (id) => id.toString() === contactId
    );

    if (!contactExists) {
      return next(new ErrorHandler("Contact not found in your list", 404));
    }

    user.contacts = user.contacts.filter(
      (id) => id.toString() !== contactId
    );

    await user.save();

    return res
      .status(200)
      .json(new SuccessHandler(200, "Contact removed successfully"));
  } catch (error) {
    next(error);
  }
};


export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = req.params.id;

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId and ReceiverId is required", 400));
    }

    const { messages } = req.body;
    if (!messages) {
      return next(new ErrorHandler("Message is required", 400));
    }

    const newMessage = new Chats({
      senderId,
      receiverId,
      messages: messages,
    });

    await newMessage.save();
    return res
      .status(200)
      .json(new SuccessHandler(200, "Message sent", { data: newMessage }));
  } catch (error) {
    next(error);
  }
};
