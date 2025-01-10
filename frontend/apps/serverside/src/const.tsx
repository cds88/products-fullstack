 

export const TABLE_COLUMNS = {
  TITLE: "title",
  CATEGORY: "category",
  BRAND: "brand",
  PRICE: "price",
  RATING: "rating",
  TAGS: "tags",
} as const;

export const TABLE_COLUMNS_ARRAY = [
  TABLE_COLUMNS.TITLE,
  TABLE_COLUMNS.CATEGORY,
  TABLE_COLUMNS.BRAND,
  TABLE_COLUMNS.PRICE,
  TABLE_COLUMNS.RATING,
  TABLE_COLUMNS.TAGS,
] as const;
export const FILTER_REQUEST_DEBOUNCE_TIMEOUT = 700 as const;
