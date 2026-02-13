"use client";

import { QueryProvider } from "@/providers/query_provider";
import { AuthProvider } from "@/providers/auth_provider";
import { useUser } from "@/hooks/use-auth";
import Loading from "./loading";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser();
  if (isLoading) {
    return <Loading />
  }
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AuthGate>{children}</AuthGate>
      </AuthProvider>
    </QueryProvider>
  );
}
