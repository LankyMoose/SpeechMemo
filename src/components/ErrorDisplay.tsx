export function ErrorDisplay({ children }: { children: JSX.Children }) {
  return (
    <div className="bg-[#fff1] border-red-500 border-2 p-4 rounded-sm text-2xl max-w-(--breakpoint-sm) mx-8 text-center">
      {children}
    </div>
  )
}
