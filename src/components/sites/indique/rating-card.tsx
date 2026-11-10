import Image from "next/image";
import { ASSET } from "./content";

export function RatingCard({ className = "" }: { className?: string }) {
  return (
    <div data-fade-up className={`ap-review-box ${className}`}>
      <div className="ap-review-top">
        <div className="ap-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="ap-star">
              <Image
                src={`${ASSET}/images/star-icon.png`}
                alt=""
                width={16}
                height={16}
              />
            </div>
          ))}
        </div>
        <div className="ap-google">
          <Image
            src={`${ASSET}/images/google-icon.png`}
            alt="Google"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="ap-review-num">
        <span className="ap-big-number">4.7</span>
        <span className="ap-small-number">/5</span>
      </div>
      <div className="ap-review-copy">
        <p className="ap-title-review">Excellent</p>
        <p className="ap-based">Based on 3 576 reviews</p>
      </div>
    </div>
  );
}
