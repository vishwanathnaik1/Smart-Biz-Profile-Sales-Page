import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

interface MobileStickyCtaProps {
  onOpenModal: () => void;
}

export function MobileStickyCta({ onOpenModal }: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_28px_-12px_oklch(20%_0.04_262/0.22)] backdrop-blur-md md:hidden">
      <Button
        variant="primary"
        size="lg"
        onClick={onOpenModal}
        className="w-full"
      >
        Build My Smart Biz Profile
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
