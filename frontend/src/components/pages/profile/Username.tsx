import UpdateUsername from "./UpdateUsername";

interface UsernameProps {
  username: string;
}

export default function Username({
  username,
}: UsernameProps): React.ReactElement {
  return (
    <div className="bg-card p-4 relative flex justify-between w-full rounded shadow">
      <span>Username</span> <span className="text-primary">{username}</span>
      <div className="absolute -bottom-1 right-0">
        <UpdateUsername username={username} />
      </div>
    </div>
  );
}
