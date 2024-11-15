interface Banners {
  id: number | null;
  cover: string | null;
  product:  {
    id: number | null;
    name: string | null;
    price: number | null;
    positive_feedback_count: number | null;
    total_feedback_count: number | null;
    images: {
      id: number | null;
      image: string | null;
    };
    description: string | null;
    old_price: number | null;
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
    };
  };
  article: {
    id: number | null;
    created: number | null;
    cover: string | null;
    title: string | null;
    text: string | null;
  };
  category: {
    id: number | null;
    name: string | null;
    children_count: number | null;
    parent_id: number | null;
    order_num: number | null;
    thumbnail: string | null;
    banner: string | null;
  }
}

export type { Banners }
