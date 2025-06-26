
export interface FooterLink {
  path: string;
  label: string;
  isWorking: boolean;
  hasPage: boolean;
  notes?: string;
}

export const footerLinks: FooterLink[] = [
  // Categories
  { path: "/categories/electronics", label: "Electronics & Tech", isWorking: false, hasPage: false },
  { path: "/categories/home-appliances", label: "Home Appliances", isWorking: false, hasPage: false },
  { path: "/categories/fashion", label: "Fashion & Apparel", isWorking: false, hasPage: false },
  { path: "/categories/beauty", label: "Beauty & Personal Care", isWorking: false, hasPage: false },
  { path: "/categories/sports", label: "Sports & Fitness", isWorking: false, hasPage: false },
  { path: "/categories/automotive", label: "Automotive", isWorking: false, hasPage: false },
  { path: "/categories/food-beverage", label: "Food & Beverage", isWorking: false, hasPage: false },
  { path: "/products", label: "View All Categories", isWorking: true, hasPage: true },

  // Support
  { path: "/help", label: "Help Center", isWorking: true, hasPage: true },
  { path: "/contact", label: "Contact Us", isWorking: true, hasPage: true },
  { path: "/shipping-info", label: "Shipping Info", isWorking: true, hasPage: true },
  { path: "/returns-refunds", label: "Returns & Refunds", isWorking: true, hasPage: true },
  { path: "/size-guide", label: "Size Guide", isWorking: true, hasPage: true },
  { path: "/track-order", label: "Track Your Order", isWorking: true, hasPage: true },
  { path: "/faq", label: "FAQ", isWorking: true, hasPage: true },

  // Company
  { path: "/about", label: "About NubiaGo", isWorking: true, hasPage: true },
  { path: "/careers", label: "Careers", isWorking: true, hasPage: true },
  { path: "/press-media", label: "Press & Media", isWorking: true, hasPage: true },
  { path: "/investors", label: "Investor Relations", isWorking: true, hasPage: true },
  { path: "/become-supplier", label: "Become a Supplier", isWorking: true, hasPage: true },
  { path: "/affiliate", label: "Affiliate Program", isWorking: true, hasPage: true },
  { path: "/sustainability", label: "Sustainability", isWorking: true, hasPage: true },

  // Legal
  { path: "/privacy-policy", label: "Privacy Policy", isWorking: true, hasPage: true },
  { path: "/terms-of-service", label: "Terms of Service", isWorking: true, hasPage: true },
  { path: "/cookie-policy", label: "Cookie Policy", isWorking: true, hasPage: true },
];

export const validateFooterLinks = (): { working: FooterLink[], broken: FooterLink[] } => {
  const working = footerLinks.filter(link => link.isWorking && link.hasPage);
  const broken = footerLinks.filter(link => !link.isWorking || !link.hasPage);
  
  return { working, broken };
};

export const getBrokenFooterLinks = (): FooterLink[] => {
  return footerLinks.filter(link => !link.isWorking || !link.hasPage);
};

export const getFooterLinkStatus = (path: string): FooterLink | undefined => {
  return footerLinks.find(link => link.path === path);
};
