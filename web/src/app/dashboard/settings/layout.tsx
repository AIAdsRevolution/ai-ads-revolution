export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <div className="max-w-[1200px] mx-auto">
        {children}
      </div>
    </div>
  );
}
