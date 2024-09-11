import Screen from "@/components/pages/watch-party/Screen";
import GroupBox from "@/components/pages/watch-party/GroupBox";

export default function WatchPartyPage() {
  return (
    <div className="flex  h-screen">
      <GroupBox />
      <main className="flex-grow">
        <Screen />
      </main>
    </div>
  );
}
