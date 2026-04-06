"use client";

interface ChatButtonProps {
  onClick?: () => void;     // Optional click handler
  delay?: number;           // Animation delay (default 1.9s)
  isLoaded?: boolean;       // Control animation externally if needed
}

export default function ChatButton({
  onClick: _onClick,
  delay: _delay = 1.9,
  isLoaded: _isLoaded = true,
}: ChatButtonProps) {
  return null;
}
