"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";

interface SubmitButtonProps {
  label: string;
}

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? <Loader2 size={16} className="animate-spin" /> : props.label}
    </Button>
  );
}
