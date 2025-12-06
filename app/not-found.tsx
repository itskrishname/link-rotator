import GlassLayout from '@/components/GlassLayout';

export default function NotFound() {
  return (
    <GlassLayout>
      <div className="space-y-2">
        <p className="text-red-400 font-bold">404 // LINK_EXPIRED</p>
        <p className="text-sm">The link is invalid or has been removed.</p>
      </div>
    </GlassLayout>
  );
}
