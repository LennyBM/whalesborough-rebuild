export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 animate-pulse">
      <div className="flex gap-3 mb-6">
        <div className="h-16 w-16 bg-surface-container-high rounded-xl flex-shrink-0" />
        <div className="space-y-2 py-1">
          <div className="h-5 w-24 bg-surface-container-high rounded" />
          <div className="h-3 w-32 bg-surface-container rounded" />
        </div>
      </div>
      <div className="h-16 w-full bg-surface-container-low rounded-xl mb-4" />
      <div className="flex gap-3 mb-6">
        <div className="h-11 flex-1 bg-surface-container-high rounded-xl" />
        <div className="h-11 flex-1 bg-surface-container rounded-xl" />
      </div>
      {[1,2,3,4].map(i => (
        <div key={i} className="h-16 w-full bg-surface-container-low rounded-xl mb-3" />
      ))}
    </div>
  );
}
