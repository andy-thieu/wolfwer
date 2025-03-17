import SignIn from "../components/sign-in";
import { SignUp } from "../components/sign-up";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center gap-20">
      <SignIn />
      <SignUp />
    </div>
  );
}
