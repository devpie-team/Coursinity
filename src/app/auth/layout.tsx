export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex items-center justify-center min-h-[100vh]">{children}</div>
}
