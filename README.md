## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hdpe-pipes-landing
```

2. Install dependencies:
```bash
npm install
```

3. Install required type definitions:
```bash
npm install --save-dev @types/react @types/react-dom
```

## 🏗️ Build Setup

### Development Mode

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📝 Type Definitions

Key TypeScript interfaces used in the project:
```typescript
// Image carousel types
interface CarouselImage {
  url: string;
  alt: string;
}

// Mouse position for zoom functionality
interface MousePosition {
  x: number;
  y: number;
}

// Feature cards
interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// FAQ items
interface FAQ {
  q: string;
  a: string;
}

// Testimonials
interface Testimonial {
  quote: string;
  text: string;
  name: string;
  role: string;
}

// Solutions
interface Solution {
  title: string;
  desc: string;
  img: string;
}
```

## 🎨 Key Components

### ImageCarousel
- Interactive image gallery with navigation controls
- Zoom preview on hover (desktop only)
- Thumbnail navigation
- Keyboard accessible

### StickyHeader
- Appears on scroll down
- Hides on scroll up
- Quick access to CTA buttons
- Responsive design

### ProductInfo
- Product specifications
- Pricing information
- Certification badges
- CTA buttons

### FeaturesSection
- Grid layout of product features
- Icon-based visual elements
- Detailed descriptions

### FAQSection
- Accordion-style FAQ display
- Email capture form
- Catalogue request functionality


## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
