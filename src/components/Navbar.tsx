import { useAppDispatch } from "../hooks/reduxHook";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Button from "./PrimaryButton";
import { signOut } from "firebase/auth";
import { logout } from "../context/redux/AuthSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <div className="px-2 border-b-2 flex justify-between items-center h-14">
      <div className="w-full px-2 flex justify-between items-center">
        <div className="uppercase ">
          <span className="text-2xl font-semibold">Piv</span>
          <span className="text-2xl font-semibold text-red-500 italic">
            noy
          </span>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
