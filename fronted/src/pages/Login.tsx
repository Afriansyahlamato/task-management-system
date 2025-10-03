import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import api from "../lib/api";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess } from "../redux/features/auth/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", {
        username: u.trim(),
        password: p,
      });
      dispatch(loginSuccess(res.data.token));
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-1 text-center">
          Welcome back
        </h1>
        <p className="text-slate-600 mb-6 text-center">Log in to continue</p>
        <form onSubmit={onSubmit} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Username</span>
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring w-full"
              placeholder="e.g. admin"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Password</span>
            <input
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring w-full"
              placeholder="eg.12345"
            />
          </label>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="bg-slate-900 text-white mt-2">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              className="bg-blue-500 text-white flex-1"
              onClick={() => {
                setU("admin");
                setP("12345");
              }}
            >
              Admin
            </Button>
            <Button
              type="button"
              className="bg-green-500 text-white flex-1"
              onClick={() => {
                setU("guest");
                setP("12345");
              }}
            >
              Guest
            </Button>
          </div>
          <div className="flex   justify-center align-middle gap-2 text-xs text-slate-500">
            <span>
              <b>💡 Tip:</b>
              <Button
                type="button"
                className="ml-2 inline-flex items-center rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                onClick={() =>
                  window.open(
                    "http://localhost:4000/docs",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Click Here to create new user
              </Button>{" "}
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
}
