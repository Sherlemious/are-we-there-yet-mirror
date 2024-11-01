import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavigationBar({ fontColor }: { fontColor: string }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLAnchorElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  // Update indicator position when active link or hover changes
  const updateIndicator = (index: number) => {
    if (index === -1) {
      // Find active link when no hover
      const activeLink = linkRefs.current.findIndex((link) =>
        link?.classList.contains("is-active"),
      );
      if (activeLink !== -1) {
        index = activeLink;
      }
    }

    if (index !== -1 && linkRefs.current[index]) {
      const link = linkRefs.current[index];
      const navRect = navRef.current?.getBoundingClientRect() ?? { left: 0 };
      const linkRect = link.getBoundingClientRect();

      setIndicatorStyle({
        left: `${linkRect.left - navRect.left}px`,
        width: `${linkRect.width}px`,
      });
    }
  };

  function handleStyles(props: { isActive: boolean }) {
    const baseStyles =
      " text-sub-headings hover:text-accent-gold transition-colors duration-200 ease-in-out ";

    if (props.isActive) {
      return `${baseStyles} is-active text-accent-gold underline underline-thickness-2 underline-offset-[8px]`;
    }

    return baseStyles + fontColor;
  }

  useEffect(() => {
    updateIndicator(hoveredIndex);
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <div className="flex w-full justify-center pb-20 pt-7">
      <nav ref={navRef} className="relative flex w-1/2 justify-around">
        {/* Animated underline indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-accent-gold transition-all duration-200 ease-in-out"
          style={indicatorStyle}
        />

        <NavLink
          ref={(el) => (linkRefs.current[0] = el!)}
          to="/home"
          className={(props) => handleStyles(props)}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </NavLink>
        <NavLink
          ref={(el) => (linkRefs.current[1] = el!)}
          to="/activity"
          className={(props) => handleStyles(props)}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          Activities
        </NavLink>
        <NavLink
          ref={(el) => (linkRefs.current[2] = el!)}
          to="/historical-places"
          className={(props) => handleStyles(props)}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          Historical Places
        </NavLink>
        <NavLink
          ref={(el) => (linkRefs.current[3] = el!)}
          to="/itineraries"
          className={(props) => handleStyles(props)}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          Itineraries
        </NavLink>
      </nav>
    </div>
  );
}
