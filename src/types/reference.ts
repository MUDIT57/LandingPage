export interface CarouselImage {
  url: string;
  alt: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  text: string;
  name: string;
  role: string;
}

export interface Solution {
  title: string;
  desc: string;
  img: string;
}