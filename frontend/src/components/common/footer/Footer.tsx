import Menu from "./Menu";

export default function Footer(): React.ReactElement {
  return (
    <footer className="py-2 flex justify-center items-center sticky bottom-0 z-10 bg-gradient-to-b from-backgroundZero to-background">
      <Menu />
    </footer>
  );
}
