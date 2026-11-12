import catalogueData from "@/data/catalogue.json";
import buildingMaterials from "@/assets/building-materials.jpg";
import hardwareTools from "@/assets/hardware-tools.jpg";
import powerTools from "@/assets/power-tools.jpg";
import safety from "@/assets/safety.jpg";

export type AttributeValue = string | string[];
export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand?: string | undefined;
  manufacturer?: string | undefined;
  category: string;
  description?: string;
  summary: string;
  image: string;
  images: string[];
  attributes: Record<string, AttributeValue>;
  source: {
    vendor: string;
    vendorSlug: string;
    row: number;
    workbook: string;
  };
};

type SourceProduct = Omit<Product, "brand" | "manufacturer" | "summary" | "image"> & {
  brand: string | string[] | null;
  manufacturer: string | string[] | null;
};

const sourceProducts = catalogueData.products as SourceProduct[];
const sourceCategories = catalogueData.categories as Category[];
const categoryHeroImages: Record<string, string> = {
  "building-materials.jpg": buildingMaterials,
  "hardware-tools.jpg": hardwareTools,
  "power-tools.jpg": powerTools,
  "safety.jpg": safety,
};

const assetUrl = (assetPath: string) =>
  assetPath.startsWith("/") ? `${import.meta.env.BASE_URL}${assetPath.slice(1)}` : assetPath;

export const categories = sourceCategories.map((category) => ({
  ...category,
  image: categoryHeroImages[category.image.split("/").pop() ?? ""] ?? category.image,
}));

const categoryImages = new Map(categories.map((category) => [category.slug, category.image]));

function firstText(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) return value[0];
  return value || undefined;
}

function valueText(value: AttributeValue) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function getSummary(product: SourceProduct) {
  const description = product.description?.split("|")[0]?.trim();
  if (description) return description;

  const attribute = Object.values(product.attributes)[0];
  return attribute ? valueText(attribute) : "Product details available on request.";
}

export const products: Product[] = sourceProducts.map((product) => {
  const images = product.images.map(assetUrl);
  return {
    ...product,
    brand: firstText(product.brand),
    manufacturer: firstText(product.manufacturer),
    summary: getSummary(product),
    images,
    image: images[0] ?? categoryImages.get(product.category) ?? "",
  };
});

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const formatAttributeValue = valueText;
