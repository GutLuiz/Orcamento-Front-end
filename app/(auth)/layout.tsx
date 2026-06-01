import { ServerWakeBanner } from "@/components/server-wake/server-wake-banner"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServerWakeBanner />
      {children}
    </>
  )
}