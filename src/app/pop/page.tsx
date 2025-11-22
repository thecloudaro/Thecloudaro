"use client";
import FeatureRequestModal from "@/components/FeatureRequestModal"; // ✅ no curly braces

export default function PopTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(var(--pop-page-bg))' }}>
      <FeatureRequestModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
