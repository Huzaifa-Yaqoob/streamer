"use client";

import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { H6, P } from "../../common/typography";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LogOut(): React.ReactElement {
  const logOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"link"}
            className="p-0 text-destructive"
            onClick={logOut}
          >
            <H6 className="">
              <FaSignOutAlt />
            </H6>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-0 mt-2 border-none">
          <P>Log Out</P>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
