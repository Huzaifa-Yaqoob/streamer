import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Small, Strong } from "@/components/common/typography";

const dummyData = [
  { name: "user1", avatarUrl: "https://github.com/shadcn.png", role: "Admin" },
  { name: "user2", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
  { name: "user3", avatarUrl: "https://github.com/shadcn.png" },
];

export default function Members() {
  return (
    <section className="p-2 flex flex-col h-full overflow-y-scroll space-y-4">
      {dummyData.map((data, index) => (
        <div key={index} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={data.avatarUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Small>{data.name}</Small>
          {data.role === "Admin" ? (
            <Strong className="bg-secondary text-secondary-foreground">
              Admin
            </Strong>
          ) : (
            <></>
          )}
        </div>
      ))}
    </section>
  );
}
