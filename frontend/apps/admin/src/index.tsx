import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";
import AdminApp from "./App";

const container = document.getElementById("root");
const root = createRoot(container, {
  onUncaughtError: () => {},
  onCaughtError: () => {},
});

root.render(<AdminApp />);
