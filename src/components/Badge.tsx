export default function Badge({ children }: { children: React.ReactNode }) {
    return (
      <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-200">
        {children}
      </span>
    );
}