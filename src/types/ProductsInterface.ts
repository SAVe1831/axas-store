interface filter {
  filter_id: number | null;
  single_value: string | null;
  range_value_from: number | null;
  range_value_to: number | null;
  flag_value: boolean | null;
}

interface products {
  id: number;
  name: string | null;
  price: number | null;
  positive_feedback_count: number | null;
  totalFeedbackCount: number | null;
  images: {
    id: number | null;
    image: string | null;
  };
  description: string | null;
  oldPrice: number | null;
  tag: string | null;
  order_num: number | null;
  category_id: number | null;
  weight: number | null;
  is_special: boolean | null;
  in_stock: number | null;
  article: string | null;
  barcode: string | null;
  thumbnail: string | null;
  rating: number | null;
  popularity: number | null;
  in_favorites: boolean | null;
  category: {
    id: number | null;
    name: string | null;
    children_count: number | null;
    parent_id: number | null;
    order_num: number | null;
    thumbnail: string | null;
    banner: string | null;
  };
  supercategory: {
    id: number | null;
    name: string | null;
    children_count: number | null;
    parent_id: number | null;
    order_num: number | null;
    thumbnail: string | null;
    banner: string | null;
  }
}

export type { filter, products }
