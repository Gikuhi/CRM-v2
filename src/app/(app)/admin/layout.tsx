
// This layout file can remain to apply specific styles or providers to the admin section in the future.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <div className="space-y-6">{children}</div>;
}
