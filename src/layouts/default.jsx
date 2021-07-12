export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full h-screen overflow-hidden bg-modern-dim">
      { children }
    </div>
  )
}