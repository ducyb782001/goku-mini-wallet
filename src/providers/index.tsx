"use client";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// Create a react query client
const queryClient = new QueryClient({
  defaultOptions: {
    // react query stop refetch when switch browser tabs
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#00ffff"
        options={{ showSpinner: true }}
        shallowRouting
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </>
  );
}
