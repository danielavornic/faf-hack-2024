export interface Phone {
  id: number;
  name: string;
  avgPrice: number;
  imageUrl: string;
  score: number;
  expertsFeedback: string;
  overview: {
    value: string | number;
    other: string | number;
    unit: string;
    title: string;
    description: string;
  }[];
  display: Spec[];
  performance: Spec[];
  camera: Spec[];
  priceTags: {
    name: string;
    url: string;
    merchant: string;
    price: number;
  }[];
}

export interface Spec {
  name: string;
  value: string | number;
  description: string;
}
