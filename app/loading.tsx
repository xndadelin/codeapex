export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
        Loading...
      </p>
    </div>
  );
}
