export function ErrorDisplay({ children }: { children: JSX.Children }) {
  return (
    <div className="bg-[#fff1] border-red-500 border-2 p-4 rounded text-2xl max-w-screen-sm mx-8 text-center">
      {children}
    </div>
  )
}
