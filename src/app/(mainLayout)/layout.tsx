import MainLayout from "@/components/MainLayout";

export default async function RootLayout({ children }: any) {
  return <MainLayout>{children}</MainLayout>;
}
