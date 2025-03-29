// src/app/dashboard/page.tsx
import dynamic from "next/dynamic";

const DashboardWithNoSSR = dynamic(() => import("@/components/Dashboard"), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardWithNoSSR />;
}
