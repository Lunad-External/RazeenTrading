import buildingMaterials from "@/assets/building-materials.jpg";
import hardwareTools from "@/assets/hardware-tools.jpg";
import powerTools from "@/assets/power-tools.jpg";
import safety from "@/assets/safety.jpg";

export type Category = { slug: string; name: string; description: string; image: string };
export type Product = { slug: string; name: string; brand: string; category: string; spec: string; image: string; description: string; specs: string[] };

export const categories: Category[] = [
  { slug: "building-materials", name: "Building Materials", description: "Core materials for construction and repair.", image: buildingMaterials },
  { slug: "hardware", name: "Hardware", description: "Fixings, fasteners and everyday site essentials.", image: hardwareTools },
  { slug: "power-tools", name: "Power Tools", description: "Professional tools for demanding site work.", image: powerTools },
  { slug: "hand-tools", name: "Hand Tools", description: "Reliable tools for precision and daily use.", image: hardwareTools },
  { slug: "paints-coatings", name: "Paints & Coatings", description: "Surface preparation, protection and finishing.", image: buildingMaterials },
  { slug: "welding", name: "Welding", description: "Welding equipment, consumables and accessories.", image: powerTools },
  { slug: "adhesives-sealants", name: "Adhesives & Sealants", description: "Bonding, sealing and maintenance solutions.", image: buildingMaterials },
  { slug: "safety", name: "Safety", description: "Personal protection for safer worksites.", image: safety },
];

export const products: Product[] = [
  { slug: "professional-cordless-drill", name: "Professional Cordless Drill", brand: "TradePro", category: "power-tools", spec: "18V platform · Variable speed", image: powerTools, description: "A versatile cordless drill for installation, maintenance and general construction work.", specs: ["18V cordless platform", "Variable speed control", "Keyless chuck", "Forward and reverse drive"] },
  { slug: "heavy-duty-circular-saw", name: "Heavy-Duty Circular Saw", brand: "BuildMaster", category: "power-tools", spec: "Precision cutting · Site ready", image: powerTools, description: "A robust circular saw designed for reliable cutting across common site materials.", specs: ["Adjustable cutting depth", "Bevel cutting support", "Dust extraction port", "Ergonomic grip"] },
  { slug: "general-purpose-hand-tool-set", name: "General Purpose Hand Tool Set", brand: "Workline", category: "hand-tools", spec: "Essential workshop selection", image: hardwareTools, description: "A practical selection of hand tools for installation, repair and maintenance teams.", specs: ["Hardened steel tools", "Comfort-grip handles", "Workshop-ready selection", "Portable organization"] },
  { slug: "site-safety-kit", name: "Site Safety Kit", brand: "SafeWorks", category: "safety", spec: "Head, eye and hand protection", image: safety, description: "Core personal protective equipment for general construction and maintenance environments.", specs: ["Impact-resistant helmet", "Clear safety eyewear", "Protective gloves", "High-visibility vest"] },
  { slug: "concrete-building-blocks", name: "Concrete Building Blocks", brand: "CoreBuild", category: "building-materials", spec: "General construction grade", image: buildingMaterials, description: "General-purpose concrete building blocks for a range of construction requirements.", specs: ["Consistent dimensions", "General-purpose grade", "Suitable for site applications", "Bulk enquiry available"] },
  { slug: "assorted-fastener-pack", name: "Assorted Fastener Pack", brand: "FixRight", category: "hardware", spec: "Bolts, nuts and fixings", image: hardwareTools, description: "A useful mixed selection of common metal fasteners for maintenance and installation tasks.", specs: ["Mixed standard sizes", "Corrosion-resistant finish", "Organized selection", "Trade quantities available"] },
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);