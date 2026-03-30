"use client";

import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(var(--ui-video-modal-backdrop))]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl p-4 mx-2 rounded-lg bg-[rgb(var(--ui-video-modal-surface))]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 rounded-full p-1 bg-[rgb(var(--ui-video-modal-close-bg))] text-[rgb(var(--ui-video-modal-close-icon))] hover:bg-[rgb(var(--ui-video-modal-close-hover))]"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        <div style={{ paddingBottom: "56.25%", position: "relative", height: 0 }}>
          <iframe
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
