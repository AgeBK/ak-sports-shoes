import Image from "next/image";

export default function Page() {
  return (
    <div style={{ position: "relative", height: "400px", maxWidth: "400px" }}>
      <Image
        src="/assets/img/8608546-1.webp"
        alt=":("
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
