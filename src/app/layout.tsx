export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Card Clashers</title>
        <meta name="description" content="Build and clash some cards!" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}