"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  imgSrc: string;
  fallback: string;
}

export default function UserAvatar({
  imgSrc,
  fallback,
}: UserAvatarProps): React.ReactElement {
  return (
    <Avatar className="w-24 h-24">
      <AvatarImage
        src={imgSrc}
        alt="avatar"
        className="bg-primary-foreground"
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
