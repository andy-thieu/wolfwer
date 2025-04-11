import { Hero } from "~/components/ui/animated-hero";

export default function Home() {
  return (
    <div className="dark:bg-secondaryBlack relative block w-full bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] px-4 lg:pt-0">
      <Hero />
    </div>
  );
}
