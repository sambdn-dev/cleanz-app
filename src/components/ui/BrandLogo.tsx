/** One silhouette across the header and launch screen; the theme supplies its material. */
export const BrandLogo = ({ className = '', width }: { className?: string; width?: number }) => (
  <span className={`cleanz-wordmark ${className}`} style={width ? { width } : undefined}>
    cleanz<span className="cleanz-wordmark-glow" aria-hidden="true" />
  </span>
);
