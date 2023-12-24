"use client";

import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import Email from "./Email";
import Username from "./Username";
import DeleteAccount from "./DeleteAccount";

export default function Profile() {
  const { data } = useSession();
  const firstLetter = data?.user?.name?.charAt(0);
  return (
    <div className="mt-8 flex flex-col items-center gap-8 ">
      <UserAvatar
        imgSrc={data?.user?.image || "/assets/unknown.png"}
        fallback={firstLetter || "S"}
      />
      <Email email={data?.user?.email || "Email not Found"} />
      <Username username={data?.user?.name || "username not found"} />
      <div className="flex items-start w-full">
        <DeleteAccount />
      </div>
    </div>
  );
}
