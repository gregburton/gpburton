type Link = {
  external: boolean;
  url: string;
};

export type ToolProps = {
  image: string;
  altText: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
};

export type MobileNavProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StackHighlightProps = {
  image: string;
  altText: string;
  url: string;
  description?: string;
  title?: string;
  subtitle?: string;
};

export type FeatureProps = {
  title: string;
  description: string;
  image?: string;
};

export type ProjectProps = {
  image: string;
  name: string;
  description: string;
  tools: ToolProps[];
  link?: Link;
};
export type TooltipProps = {
  id: string;
  text: string;
};
