import { type ResponsiveType } from 'react-multi-carousel';

export const carouselResponsive: ResponsiveType = {
  defeault: {
    breakpoint: { max: 8000, min: 1241 },
    items: 8
  },

  superLargeDesktop2: {
    breakpoint: { max: 1240, min: 1025 },
    items: 5
  },
  superLargeDesktop: {
    breakpoint: { max: 1024, min: 769 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 768, min: 601 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 600, min: 426 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 425, min: 0 },
    items: 1
  }
};
