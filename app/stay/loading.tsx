export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 animate-pulse">
      <div className="h-6 w-24 bg-surface-container-high rounded mb-2" />
      <div className="h-4 w-48 bg-surface-container rounded mb-6" />
      <div className="h-36 w-full bg-surface-container-high rounded-xl mb-6" />
      <div className="flex gap-2 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-8 w-20 bg-surface-container rounded-full" />)}
      </div>
      <div className="h-12 w-full bg-surface-container rounded-xl mb-4" />
      {[1,2,3,4].map(i => (
        <div key={i} className="flex gap-3 mb-4">
          <div className="h-20 w-28 bg-surface-container-high rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 w-32 bg-surface-container rounded" />
            <div className="h-3 w-24 bg-surface-container rounded" />
            <div className="h-3 w-16 bg-surface-container rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
