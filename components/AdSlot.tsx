import { shouldRenderAdUnits } from "@/lib/env";
import Ad1 from "@/components/Ad1";

interface AdSlotProps {
  /** Used only for internal labeling/testing, never shown to users as anything but "Advertisement". */
  id: string;
}

/**
 * Renders a labeled, layout-reserved AdSense unit ONLY when
 * NEXT_PUBLIC_ADSENSE_ENABLE_UNITS=true and the publisher ID is valid. A valid
 * client ID alone keeps verification and ads.txt live during review but does
 * not display an ad unit.
 */
export default function AdSlot({ id }: AdSlotProps) {
  if (!shouldRenderAdUnits()) {
    return null;
  }

  return (
    <div className="ad-slot" data-ad-slot-id={id}>
      <span className="ad-slot-label">Advertisement</span>
      <Ad1 />
    </div>
  );
}
