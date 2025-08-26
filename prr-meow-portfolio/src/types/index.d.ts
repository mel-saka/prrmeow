// This file contains TypeScript type definitions used throughout the application, providing type safety for props and state.

export type Look = {
  id: string;
  title: string;
  designerId: string;
  category: string;
  palette: string[];
  fabric: string;
  sizeRange: string;
  hero: string;
  gallery: string[];
  notes: string;
  price: string;
  isNew: boolean;
  likes?: number;
};

export type Designer = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  socials: {
    instagram: string;
    web: string;
  };
};

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}