import { H1, Lead } from "@/components/common/typography";
import JoinUs from "@/components/pages/landing-page/JoinUs";
import LandingLayout from "@/components/layouts/LandingLayout";

export default function LandingPage() {
  return (
    <LandingLayout>
      <section className="flex flex-col items-center justify-between flex-grow py-8">
        <H1 className="text-primary">Streamer</H1>
        <JoinUs />
        <Lead className="text-primary-foreground">Watch movies together.</Lead>
      </section>
    </LandingLayout>
  );
}
