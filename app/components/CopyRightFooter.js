import { AiOutlineMail } from "react-icons/ai";
import PrivacyPolicy from "./PrivacyPolicy";

export default function CopyRightFooter() {
  return (
    <>
      <footer
        className="w-full py-2  text-white text-center text-sm fixed bottom-0 left-0"
        style={{
          boxShadow: "0 -2px 20px rgba(255, 3, 119,50%)",
          backgroundColor: "rgb(4, 9, 20)",
        }}
      >
        <div className="">
          <span>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/KINGACH2549"
              target="_blank"
              rel="noreferrer noopener"
            >
              Achintya Mishra.
            </a>{" "}
            &nbsp; All rights reserved. &nbsp;
          </span>
          <a href="mailto:sciencerage802@gmail.com">
            sciencerage802@gmail.com &nbsp;
          </a>
          <span>For more about our privacy policy please </span>
          <PrivacyPolicy />
        </div>
      </footer>
    </>
  );
}
