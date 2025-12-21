"use client";
import FeatureRequestModal from "@/components/FeatureRequestModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PopTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(var(--pop-page-bg))' }}>
      <FeatureRequestModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
