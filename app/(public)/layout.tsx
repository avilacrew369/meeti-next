export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <h1>Desde Panther Layout</h1>
    {children}
   </>
  );
}