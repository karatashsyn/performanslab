import KvkkPage from "@/views/KvkkPage";

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "KVKK Aydınlatma Metni — PerformansLab",
  description:
    "PerformansLab kişisel verilerin korunması kanunu kapsamında aydınlatma metni.",
};

export default function Page() {
  return <KvkkPage />;
}
