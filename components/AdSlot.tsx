import { shouldRenderAdUnits } from "@/lib/env";

interface AdSlotProps {
  /** Used only for internal labeling/testing, never shown to users as anything but "Advertisement". */
  id: string;
}

/**
 * Renders a labeled ad container ONLY when NEXT_PUBLIC_ADSENSE_ENABLE_UNITS=true
 * AND a real AdSense client ID is configured — see shouldRenderAdUnits() in
 * lib/env.ts. These are deliberately two separate conditions: a valid client ID
 * alone (e.g., while only the verification snippet is live, pre-approval) is
 * NOT enough to show ad units. Never renders a blank placeholder or fake ad
 * when either condition isn't met, per AdSense policy.
 */
export default function AdSlot({ id }: AdSlotProps) {
  if (!shouldRenderAdUnits()) {
    return null;
  }

  return (
    <div className="ad-slot" data-ad-slot-id={id}>
      <span className="ad-slot-label">Advertisement</span>
      {/* Real <ins className="adsbygoogle"> unit is inserted here once the site is
          approved. Left intentionally inert until then — see checklist item 6. */}
      <div className="ad-slot-placeholder" aria-hidden="true" />
    </div>
  );
}
