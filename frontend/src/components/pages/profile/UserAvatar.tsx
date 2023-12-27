"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChangeAvatar from "./ChangeAvatar";

interface UserAvatarProps {
  imgSrc: string;
  fallback: string;
}

export default function UserAvatar({
  imgSrc,
  fallback,
}: UserAvatarProps): React.ReactElement {
  return (
    <div className="relative w-fit">
      <Avatar className="w-24 h-24">
        <AvatarImage
          src={imgSrc}
          alt="avatar"
          className="bg-primary-foreground"
        />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="absolute bottom-0 right-0">
        <ChangeAvatar username="m" />
      </div>
    </div>
  );
}
