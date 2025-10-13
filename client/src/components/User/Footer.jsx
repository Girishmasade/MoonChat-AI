import { Footer } from "antd/es/layout/layout";


const AiFooter = () => {
  return (
    <div>
      <Footer style={{ textAlign: "center", background: "transparent", color: "white" }}>
        NovaChat AI ©{new Date().getFullYear()} Created by @Girish-Masade
      </Footer>
    </div>
  );
};

export default AiFooter;
