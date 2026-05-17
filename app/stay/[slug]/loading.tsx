export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-24 animate-pulse">
      <div className="h-64 w-full bg-surface-container-high" />
      <div className="px-4 pt-4 space-y-4">
        <div className="h-7 w-48 bg-surface-container-high rounded" />
        <div className="h-4 w-64 bg-surface-container rounded" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="h-6 w-20 bg-surface-container rounded-full" />)}
        </div>
        <div className="h-12 w-full bg-surface-container-high rounded-xl" />
        <div className="h-40 w-full bg-surface-container-low rounded-xl" />
        <div className="h-32 w-full bg-surface-container-low rounded-xl" />
      </div>
    </div>
  );
}
