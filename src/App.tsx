import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Shield,
  Zap,
  Droplet,
  Leaf,
  CheckCircle,
} from "lucide-react";

import { CarouselImage,MousePosition,Feature,FAQ,Testimonial,Solution } from "./types/reference";

const Header = () => (
  <header className="border-b border-gray-200">
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-2xl font-bold">
          <span className="text-red-600">MANGALAM</span>
          <div className="text-xs text-gray-600">PIPE & PROFILE</div>
        </div>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          About Us
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Products
        </a>
        <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
          Contact Us
        </button>
      </nav>
    </div>
  </header>
);

const StickyHeader = ({
  isSticky,
  showSticky,
}: {
  isSticky: boolean;
  showSticky: boolean;
}) => (
  <div
    className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md transition-transform duration-300 ${
      isSticky && showSticky ? "translate-y-0" : "-translate-y-full"
    }`}
  >
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold">
            <span className="text-red-600">MANGALAM</span>
            <div className="text-[10px] text-gray-600">PIPE & PROFILE</div>
          </div>
          <div className="hidden md:block">
            <h2 className="font-semibold text-gray-900 text-sm">
              Premium HDPE Pipes & Coils
            </h2>
            <p className="text-xs text-gray-600">₹4,80,000 - 7,90,000</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition text-sm font-semibold">
            View Details
          </button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm font-semibold">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Breadcrumb = () => (
  <div className="bg-gray-50 border-b border-gray-200">
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center text-sm text-gray-600">
        <span>Products</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Two For One Twister</span>
      </div>
    </div>
  </div>
);

const ImageCarousel = ({ images }: { images: CarouselImage[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showZoomPreview, setShowZoomPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleMainImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
    setShowZoomPreview(true);
  };

  const handleMainImageMouseLeave = () => {
    setShowZoomPreview(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div
          className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden cursor-crosshair"
          onMouseMove={handleMainImageMouseMove}
          onMouseLeave={handleMainImageMouseLeave}
        >
          <img
            src={images[currentImage].url}
            alt={images[currentImage].alt}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {showZoomPreview && (
          <div className="absolute left-full ml-4 top-0 z-10 pointer-events-none hidden lg:block">
            <div className="w-96 h-96 bg-white rounded-lg shadow-2xl border-2 border-gray-300 overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${images[currentImage].url})`,
                  backgroundSize: "250%",
                  backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-all ${
              currentImage === idx
                ? "border-blue-900"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductInfo = () => (
  <div>
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
        <Shield className="w-4 h-4" />
        <span>BIS Certified</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
        <Shield className="w-4 h-4" />
        <span>ISO Certified</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
        <span className="font-bold">CE</span>
        <span>CE Certified</span>
      </div>
    </div>

    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
      Premium HDPE Pipes & Coils for Modern Infrastructure
    </h1>

    <div className="space-y-3 mb-6">
      {[
        "Leak Proof Fusion Joints",
        "Chemical Resistance",
        "50+ Year Service Life",
        "Flexible Installation",
        "Flexible Installation",
      ].map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>

    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-2">Price Range</div>
      <div className="text-2xl font-bold text-gray-900">
        ₹4,80,000 - 7,90,000
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
          Shipping: 8-12 days
        </span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
          Returns: If received within 7 days
        </span>
      </div>
      <div className="text-sm text-gray-600 mt-3">
        Certifications: ISO Certified, BIS Certified
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <button className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
        Get Custom Quote
      </button>
      <button className="flex-1 border-2 border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold flex items-center justify-center gap-2">
        View Technical Specs
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const Footer = () => (
  <div>
    <section className="py-12 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Resources & Downloads
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get all the technical documentation and resources you need to make
            informed decisions about our HDPE piping solutions.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-12">
          {[
            "HDPE Pipe Installation Manual (PDF)",
            "Maintenance & Inspection Handbook (PDF)",
            "Engineering Specifications Sheet (PDF)",
          ].map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
            >
              <span className="text-gray-700">{doc}</span>
              <button className="flex items-center gap-2 text-blue-900 font-semibold hover:underline">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-900 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Textile Manufacturing?
              </h2>
              <p className="text-blue-100 mb-6">
                Get a personalized consultation and quote for machinery
                solutions tailored to your unique production requirements.
              </p>
              <p className="text-sm text-blue-200">
                For immediate assistance, feel free to call us at
                +91-XXX-XXX-XXXX. You can also send us a quick email at{" "}
                <a href="mailto:info@example.com" className="underline">
                  info@example.com
                </a>
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Us Today
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                >
                  Request Custom Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="text-red-600">MANGALAM</span>
              <div className="text-xs text-gray-600">PIPE & PROFILE</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>
                Premium HDPE Pipes & Fittings Manufacturer in South India
              </strong>
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>
                  Survey No. 18, SIDCO Hudco, Indl - 635 1703 Hosur, Tamil Nadu
                  635109
                </span>
              </div>
              <div>📞 +91-XXX-XXX-XXXX</div>
              <div>✉️ info@example.com</div>
              <div>🌐 www.mangalamfibres.com</div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition"
              >
                <span className="text-gray-700">in</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition"
              >
                <span className="text-gray-700">𝕏</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition"
              >
                <span className="text-gray-700">📷</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Packaging Industry Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Fishnet Manufacturing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  HDPE Tubes and Textiles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  FIBC and Woven Sack
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Carpet and Rugs Industry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Technical Textiles
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Two For One Twister
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  HDPE Twister Machine
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Bag Packing Machines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Covering Machines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Heat Setting Stenovens
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Brand Converted Winders
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div>
            Copyright © 2025 Meera Industries Limited | All Rights Reserved
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

const HeroSection = ({
  heroRef,
  images,
}: {
  heroRef: React.RefObject<HTMLElement|null>;
  images: CarouselImage[];
}) => (
  <section ref={heroRef} className="py-8 lg:py-12">
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <ImageCarousel images={images} />
        <ProductInfo />
      </div>
    </div>
  </section>
);

const TrustedCompanies = () => (
  <div>
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 mb-6">
          Trusted by Hundreds of Companies Globally
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[1, 2, 3, 4, 5, 6].map((_, idx) => (
            <div key={idx} className="text-xl font-bold text-gray-800">
              <span className="text-blue-600">EURO</span>FLEX
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-12 lg:py-16 bg-slate-900 text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Technical Specifications at a Glance
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl">
          Comprehensive performance data demonstrating our commitment to quality
          and engineering excellence.
        </p>

        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-6 font-semibold">
                    PARAMETER
                  </th>
                  <th className="text-left py-4 px-6 font-semibold">
                    SPECIFICATION
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pipe Diameter Range", '20mm to 1600mm (3/4" to 63")'],
                  [
                    "Pressure Ratings",
                    "PN 2.5, PN 4, PN 6, PN 8, PN 10, PN 12.5, PN 16",
                  ],
                  [
                    "Standard Dimension Ratio",
                    "SDR 33, SDR 26, SDR 21, SDR 17, SDR 13.6, SDR 11",
                  ],
                  ["Operating Temperature", "-40°C to +60°C (-40°F to +140°F)"],
                  ["Service Life", "50+ Years (at 20 degrees C, PN 10)"],
                  ["Material Density", "0.95 - 0.96 g/cm3"],
                  ["Certification Standards", "IS 5834, ISO 4427, ASTM D3035"],
                  ["Joint Type", "Butt Fusion, Electrofusion, Mechanical"],
                  ["Coil Lengths", "Up to 500mm (for smaller diameters)"],
                  ["Country of Origin", "🇮🇳 India"],
                ].map(([param, spec], idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-700 last:border-0"
                  >
                    <td className="py-4 px-6 text-gray-300">{param}</td>
                    <td className="py-4 px-6">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition">
            <Download className="w-5 h-5" />
            Download Full Technical Datasheet
          </button>
        </div>
      </div>
    </section>
  </div>
);

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: <Shield className="w-8 h-8 text-blue-900" />,
      title: "Superior Chemical Resistance",
      desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-900" />,
      title: "Exceptional Flexibility & Durability",
      desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.",
    },
    {
      icon: <Droplet className="w-8 h-8 text-blue-900" />,
      title: "Leak-Proof Fusion Welding",
      desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-900" />,
      title: "Cost-Effective Long-Term Solution",
      desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-blue-900" />,
      title: "Environmentally Sustainable",
      desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-900" />,
      title: "Certified Quality Assurance",
      desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.",
    },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Built to Last, Engineered to Perform.
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          From bulk bags to technical threads, Mogra delivers precision
          solutions for every stage of your packaging process.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
            Request a Quote
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      q: "What is the purpose of a laser cutter for sheet metal?",
      a: "It is designed to cut various types of sheet metal with precision, allowing for intricate designs and shapes that are essential in manufacturing processes.",
    },
    {
      q: "What are the benefits of using aluminum tubing in manufacturing?",
      a: "Aluminum tubing offers excellent strength-to-weight ratio, corrosion resistance, and cost-effectiveness for various industrial applications.",
    },
    {
      q: "How is aluminum tubing produced?",
      a: "Aluminum tubing is produced through extrusion processes where heated aluminum is forced through a die to create the desired shape and dimensions.",
    },
    {
      q: "What are the common applications of aluminum tubing?",
      a: "Common applications include automotive components, aerospace structures, HVAC systems, and general construction projects.",
    },
    {
      q: "Can aluminum tubing be customized?",
      a: "Yes, aluminum tubing can be customized in terms of dimensions, wall thickness, alloy composition, and surface treatments to meet specific requirements.",
    },
  ];

  return (
    <div>
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Want us to email the entire catalogue?
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your email and an expert will share the catalogue with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-semibold whitespace-nowrap">
                Request Catalogue
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Versatile Applications Across Industries
              </h2>
              <p className="text-gray-600 max-w-2xl">
                From technical textiles to packaging materials, our
                precision-engineered machinery delivers superior performance
                across diverse applications.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-gray-900"
              >
                <img
                  src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80"
                  alt="Fishnet Manufacturing"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    Fishnet Manufacturing
                  </h3>
                  <p className="text-sm text-gray-200">
                    High-performance twisting solutions for packaging yarn,
                    strapping materials, and specialized applications in
                    technical and packaging applications.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Excellent support for specialized applications",
      text: "The durability and performance of Meera's fishnet processing equipment has significantly improved our marine product quality. Excellent support for specialized applications.",
      name: "Carlos Mendoza",
      role: "Operations Manager",
    },
    {
      quote: "Excellent support for specialized applications",
      text: "The durability and performance of Meera's fishnet processing equipment has significantly improved our marine product quality. Excellent support for specialized applications.",
      name: "Carlos Mendoza",
      role: "Operations Manager",
    },
    {
      quote: "Provides the exact specifications we need!",
      text: "For our technical textile applications, Meera's specialized machinery provides the exact specifications we need. Their knowledgeable team helps us select optimal solutions.",
      name: "Rajesh Kumar",
      role: "Manufacturing Head",
    },
  ];

  return (
    <div>
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Advanced HDPE Pipe Manufacturing Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art extrusion technology ensures consistent
              quality, optimal material properties, and dimensional accuracy in
              every pipe we manufacture.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "Raw Material",
                "Extrusion",
                "Cooling",
                "Sizing",
                "Quality Control",
                "Marking",
                "Cutting",
                "Packaging",
              ].map((step, idx) => (
                <button
                  key={step}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    idx === 0
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  High-Grade Raw Material Selection
                </h3>
                <p className="text-gray-600 mb-6">
                  Vacuum sizing tanks ensure precise outer diameter while
                  internal pressure maintains perfect roundness and wall
                  thickness uniformity.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                    <span className="text-gray-700">PE100 grade material</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Optimal molecular weight distribution
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80"
                  alt="Manufacturing Process"
                  className="w-full rounded-lg"
                />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted Performance. Proven Results
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From innovative Two-For-One Twisters to specialized heat setting
              machines, we deliver complete solutions for modern textile
              manufacturing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
              >
                <div className="text-4xl text-blue-900 mb-4">"</div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {testimonial.quote}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const SolutionsPortfolio = () => {
  const solutions: Solution[] = [
    {
      title: "HDPE Fittings & Accessories",
      desc: "Complete range of electrofusion and butt fusion fittings, including elbows, tees, reducers, and couplers for seamless pipe connections.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    },
    {
      title: "Professional Installation Services",
      desc: "Expert installation and fusion welding services ensuring optimal system performance, compliance with standards, and long-term reliability.",
      img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
    },
    {
      title: "PE-RT Heating Pipes",
      desc: "Polyethylene of Raised Temperature resistance pipes ideal for underfloor heating, radiator connections, and hot water applications.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Complete Piping Solutions Portfolio
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From innovative Two-For-One Twisters to specialized heat setting
            machines, we deliver complete solutions for modern textile
            manufacturing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <img
                src={solution.img}
                alt={solution.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{solution.desc}</p>
                <button className="text-blue-900 font-semibold text-sm hover:underline">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Didn't find what you're looking for?
              </h3>
              <p className="text-gray-600">
                Talk to our experts for custom solutions and tailored guidance.
              </p>
            </div>
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold whitespace-nowrap flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HDPEPipesLanding = () => {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const images: CarouselImage[] = [
    {
      url: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80",
      alt: "HDPE Pipes Manufacturing",
    },
    {
      url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
      alt: "HDPE Pipes Installation",
    },
    {
      url: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80",
      alt: "HDPE Pipes Quality Control",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetTop || 600;

      if (currentScrollY > heroHeight) {
        setIsHeaderSticky(true);
        if (currentScrollY > lastScrollY) {
          setShowStickyHeader(false);
        } else {
          setShowStickyHeader(true);
        }
      } else {
        setIsHeaderSticky(false);
        setShowStickyHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isSticky={isHeaderSticky} showSticky={showStickyHeader} />
      <Header />
      <Breadcrumb />
      <HeroSection heroRef={heroRef} images={images} />
      <TrustedCompanies />
      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />
      <SolutionsPortfolio />
      <Footer />
    </div>
  );
};

export default HDPEPipesLanding;
