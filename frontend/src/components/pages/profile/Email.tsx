interface EmailProps {
  email: string;
}

export default function Email({ email }: EmailProps): React.ReactElement {
  return (
    <div className="bg-card p-4 flex space-x-16 justify-between w-full rounded shadow">
      <span>Email</span> <span className="text-primary">{email}</span>
    </div>
  );
}
