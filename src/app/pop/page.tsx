"use client";
import FeatureRequestModal from "@/components/FeatureRequestModal"; // ✅ no curly braces

export default function PopTestPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <FeatureRequestModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
