import { FaBandcamp } from "react-icons/fa";

export default function LoadingPage(): React.ReactElement {
  return (
    <div className="text-2xl p-4 rounded shadow-lg bg-primary text-primary-foreground">
      <FaBandcamp className="animate-spin" />
    </div>
  );
}
