import { cn } from "@/lib/utils";
import { EditableText, EditableImage } from "@/editor";
import React from "react";

interface AyaGuideSectionProps {
  className?: string;
  style?: React.CSSProperties;
  /** Content key prefix for EditableText/EditableImage. Defaults to "aya.guide" */
  contentKeyPrefix?: string;
}

/**
 * Айа провідник Світла та Любові
 *
 * Shared component for title + girl-claude image.
 * Sunshine rays should be added by parent if needed (due to absolute positioning requirements).
 */
const AyaGuideSection = ({
  className,
  style,
  contentKeyPrefix = "aya.guide"
}: AyaGuideSectionProps) => {
  return (
    <div className={cn("relative", className)} style={{ overflow: 'visible', ...style }}>
      {/* Text: Айа провідник Світла та Любові */}
      <EditableText
        contentKey={`${contentKeyPrefix}.title`}
        defaultValue="Айа провідник<br />Світла та Любові"
        as="h2"
        multiline
        className="relative z-[1] section-title aya-guide-title text-center font-display italic"
        style={{
          marginTop: '16rem',
          letterSpacing: '-2rem',
          color: '#fff',
          textShadow: '0 4rem 30rem rgba(106, 180, 255, 0.8), 0 0 60rem rgba(255, 255, 255, 0.5)',
        }}
      />

      {/* Girl + Cloud composition - parent animates both together */}
      <div
        className="relative z-[5] w-full girl-cloud-img"
        style={{ marginTop: '-110rem', marginBottom: '350rem' }}
      >
        {/* Girl - behind the cloud (z-3) */}
        <img
          src="/images/girl-aya.png"
          alt="Айа медитує"
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'block',
            margin: '0 auto',
            top: '50rem',
            width: 'min(600rem, 80vw)',
            height: 'auto',
          }}
        />
        {/* Cloud - overlaps girl's lower part (z-4) */}
        <EditableImage
          contentKey={`${contentKeyPrefix}.image`}
          defaultSrc="/images/cloud-s.png"
          alt="Хмара"
          style={{
            position: 'absolute',
            zIndex: 4,
            width: '100vw',
            height: 'auto',
            bottom: 'calc(-100% + 200rem)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    </div>
  );
};

export default AyaGuideSection;
