import { useState } from "react";
import {
  Avatar,
  Input,
  Button,
  Tooltip,
  Empty,
  Spin,
} from "antd";
import {
  AiOutlineSearch,
  AiOutlineMessage,
} from "react-icons/ai";
import AddContactButton from "../../components/User/AddContactButton";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/app/chatSlice";
import { useNavigate } from "react-router-dom";
import { useGetContactsQuery } from "../../redux/api/chatsApi";

const Contacts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useGetContactsQuery();

  const contactsData = data?.data?.contacts || []
  console.log(contactsData);
  

const handleFilter = contactsData.filter((item) =>
  (item.username || item.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  // const handleFilter = contacts

  const chatWithContact = (contact) => {
    dispatch(setSelectedUser(contact));
    console.log("contact added in a list", contact);
    navigate(`/chats/${contact._id}`); // Optional
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin />
      </div>
    );
  }


  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col w-full h-full rounded-xl p-6 md:px-20 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-wide">Contacts</h1>
        <AddContactButton />
      </div>

      <div className="bg-gray-700/50 backdrop-blur-md p-4 rounded-xl flex items-center shadow-inner">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          prefix={<AiOutlineSearch className="text-gray-400" />}
          size="large"
          placeholder="Search contacts..."
          className="rounded-lg bg-gray-500 border-none text-black placeholder-white"
        />
      </div>

      <div className="bg-gray-800/60 mt-8 rounded-xl p-5 shadow-lg backdrop-blur-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Your Contacts</h2>
          <p className="text-gray-400 text-sm">
            Manage your chat contacts and connections
          </p>
        </div>

        {contactsData.length === 0 ? (
          <Empty
            description={<span className="text-gray-400">No contacts found</span>}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : handleFilter.length === 0 ? (
          <Empty
            description={<span className="text-gray-400">No matching contacts</span>}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {handleFilter.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-gray-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-gray-600/30 transition-all duration-300 shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    size={56}
                    src={
                      item.avatar ||
                      "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png"
                    }
                    className="border-2 border-green-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                      {item.username}
                    </h3>
                    <p className="text-sm text-gray-400">{item.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-400 bg-green-900/40 px-3 py-1 rounded-full shadow-inner">
                    online
                  </span>

                  <Tooltip title="Send Message">
                    <Button
                      onClick={() => chatWithContact(item)}
                      shape="circle"
                      className="bg-gray-300 hover:bg-green-600 transition-all duration-300 border-none flex items-center justify-center"
                      icon={<AiOutlineMessage className="text-xl text-white" />}
                    />
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
