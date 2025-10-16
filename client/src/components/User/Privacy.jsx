import { Button, Switch } from "antd";

const Privacy = () => {
  return (
    <div className="flex flex-col text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white ">Privacy Settings</h2>
      <p className="text-sm text-gray-400 mb-6  pb-2">
        Control your privacy and data sharing preferences
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Data Collection
            </h3>
            <p className="text-gray-400 text-sm">
              Allow collection of usage data to improve the service
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">Chat History</h3>
            <p className="text-gray-400 text-sm">
              Save chat history for future reference
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Profile Visiblity
            </h3>
            <p className="text-gray-400 text-sm">
              Make your profile visible to other users
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex flex-col gap-2 border-t p-3">
          <Button
            variant="solid"
            color="danger"
            style={{
              maxWidth: "150px",
            }}
          >
            Delete Account
          </Button>
          <p className="text-gray-400 text-sm">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
