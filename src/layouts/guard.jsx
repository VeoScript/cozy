export default function Guard({ children }) {
  return (
    <div className="flex flex-row items-center justify-center w-full h-screen font-raleway bg-modern-black">
      { children }
    </div>
  )
}