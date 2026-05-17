export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 animate-pulse">
      <div className="h-6 w-32 bg-surface-container-high rounded mb-2" />
      <div className="h-4 w-48 bg-surface-container rounded mb-6" />
      <div className="h-36 w-full bg-surface-container-high rounded-xl mb-6" />
      <div className="h-16 w-full bg-surface-container-low rounded-xl mb-6" />
      <div className="flex gap-3 overflow-hidden mb-6">
        {[1,2,3].map(i => <div key={i} className="h-24 w-28 bg-surface-container-high rounded-xl flex-shrink-0" />)}
      </div>
      {[1,2,3,4].map(i => (
        <div key={i} className="h-14 w-full bg-surface-container-low rounded-xl mb-3" />
      ))}
    </div>
  );
}
