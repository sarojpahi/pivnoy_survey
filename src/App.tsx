import Router from "./context/Router";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="font-inter">
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
