import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "@/features/authSlice";
import { Button } from "./ui/button";

export function TestAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className="mb-10">
      <pre>{JSON.stringify(auth, null, 2)}</pre>
      <Button onClick={() => dispatch(userLoggedIn({ user: { name: "Yogesh", email: "yogesh@example.com" } }))}>
        Login Test
      </Button>
    </div>
  );
}
