import Link from "next/link";
import { FaInfo } from "react-icons/fa";
import { H4, H6, P } from "../../common/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header(): React.ReactElement {
  return (
    <header className="section sticky top-0">
      <nav className=" flex items-center justify-between ">
        <H4 className="text-primary">
          <Link href={"/"}>Streamer</Link>
        </H4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <H6 className="text-primary-foreground">
                <Link href={"/about"}>
                  <FaInfo />
                </Link>
              </H6>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-0 mt-2 border-none">
              <P>About</P>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </header>
  );
}
