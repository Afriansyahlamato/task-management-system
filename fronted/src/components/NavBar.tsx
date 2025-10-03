import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center gap-3 p-3">
        <Link to="/" className="font-bold text-lg">
          📓 Task Management System
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Link
            className="px-3 py-1 rounded-lg hover:bg-slate-100"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link className="px-3 py-1 rounded-lg hover:bg-slate-100" to="/about">
            About
          </Link>
          {user ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:inline">
                Signed in as <b>{user.name}</b>
              </span>
              <Button
                className="bg-slate-900 text-white"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link
              className="px-3 py-1 rounded-lg bg-slate-900 text-white"
              to="/login"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
