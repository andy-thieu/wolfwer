"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, UserRoundCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "🧙 Hexe",
      "🔮 Seher",
      "🙆‍♀️ Dorfbewohner",
      "🐺 Werwolf",
      "💕 Amor",
      "🪽 Beschützer",
      "🔫 Jäger",
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Erfahre mehr über das Projekt <MoveRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="font-regular flex max-w-2xl flex-col gap-6 text-center text-5xl tracking-tighter md:text-7xl">
              <ViewTransition name={"logo"}>
                <h1 className="text-spektr-cyan-50">wolfwer.net</h1>
              </ViewTransition>
              <h1 className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </h1>
            </div>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              Spiele mit deinen Freunden das berühmte &quot;Werwolf&quot;-Spiel
              und messe dich mit denen in einer Rangliste!
            </p>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            <Link href="/login?method=sign-in">
              <Button size="lg" className="gap-4" variant="outline">
                Anmelden <UserRoundCheck className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login?method=sign-up">
              <Button size="lg" className="gap-4">
                Kostenlos Registrieren <MoveRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
