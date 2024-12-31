import { createRoot } from "react-dom/client";
import App from "./App";

const rootDom = document.getElementById("root");

const root = createRoot(rootDom, {
  onUncaughtError(error, errorInfo) {
    console.log("unCaughtError");
    console.error(error);
    console.error(errorInfo);
  },
  onCaughtError(error, errorInfo) {
    console.log("caught error ");
    console.error(error);
    console.error(errorInfo);
  },
});

root.render(<App />);
