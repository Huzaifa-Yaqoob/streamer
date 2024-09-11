"use client";

import { FaUsers } from "react-icons/fa";
import { BsChatTextFill } from "react-icons/bs";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { H6 } from "@/components/common/typography";
import Members from "./Members";
import ChatBox from "./ChatBox";

export default function GroupBox() {
  const [tab, setTab] = useState("chat");
  return (
    <div defaultValue="chat" className="border-2 rounded-lg flex flex-col w-72">
      <div className="overflow-y-hidden flex-grow">
        {tab === "chat" ? <ChatBox /> : <Members />}
      </div>
      <div className="flex justify-center gap-4 py-2">
        <Button
          onClick={() => setTab("chat")}
          size={"icon"}
          className="text-lg"
        >
          <BsChatTextFill />
        </Button>
        <Button
          onClick={() => setTab("member")}
          size={"icon"}
          className="text-lg"
        >
          <FaUsers />
        </Button>
      </div>
    </div>
  );
}

{
  /* <Tabs defaultValue="chat" className="border-2 rounded-lg flex flex-col w-72">
  <div className="overflow-y-scroll flex-grow">
    <TabsContent value="chat">
      <ChatBox />
    </TabsContent>
    <TabsContent value="member">
      <Members />
    </TabsContent>
  </div>
  <TabsList className="">
    <TabsTrigger value="chat">Chat</TabsTrigger>
    <TabsTrigger value="member">Members</TabsTrigger>
  </TabsList>
</Tabs>; */
}
