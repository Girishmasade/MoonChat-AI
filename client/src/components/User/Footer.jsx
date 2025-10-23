import { Footer } from "antd/es/layout/layout";
import { AiFillMoon } from "react-icons/ai";


const AiFooter = () => {
  return (
    <div>
      <Footer style={{ textAlign: "center", background: "transparent", color: "white"}}>
  
 MoonChat-AI ©{new Date().getFullYear()} Created by @Girish-Masade
      </Footer>
    </div>
  );
};

export default AiFooter;
