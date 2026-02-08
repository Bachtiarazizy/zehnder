import Image from "next/image";
import LayerReveal from "@/components/LayerReveal";
import ContentReveal from "@/components/ContentReveal";
import TextReveal from "@/components/TextReveal";

export default function Home() {
  return (
    <main>
      <TextReveal />

      <LayerReveal />
      <ContentReveal />
    </main>
  );
}
