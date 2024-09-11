import { HiMiniPaperAirplane } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dummyData = [{ user: { name: "", avatarSrc: "" }, message: "" }];

export default function ChatBox() {
  return (
    <section className="p-2 flex flex-col h-full">
      <div className="flex-grow overflow-y-scroll space-y-2">
        <div className="">
          <h6 className="text-primary">Username</h6>
          <p>message he sent</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Type message here" />
        <Button size={"icon"} className="text-lg">
          <HiMiniPaperAirplane />
        </Button>
      </div>
    </section>
  );
}
