export const parsePathString = ({
  orderBy,
  filters,
}: {
  orderBy: Record<string, string>;
  filters: Record<string, string>;
}): {
  $skip: number;
  $top: number;
  $filter: string | undefined;
  $orderby: string | undefined;
} => {
  const filtersConditions = [];

  if (filters.title) {
    filtersConditions.push(
      `contains(tolower(title), '${filters.title.toLowerCase()}')`
    );
  }
  if (filters.category) {
    filtersConditions.push(`category eq '${filters.category}'`);
  }
  if (filters.brand) {
    filtersConditions.push(`brand eq '${filters.brand}'`);
  }
  if (filters.price) {
    filtersConditions.push(`price eq ${filters.price}`);
  }
  if (filters.rating) {
    filtersConditions.push(`rating eq ${filters.rating}`);
  }
  if (filters.tags) {
    const tagsArray = filters.tags
      .split(",")
      .map((tag) => {
        return `tags/any(t: t eq '${tag}')`;
      })
      .join(" and ");
    filtersConditions.push(tagsArray);
  }

  const $filter = filtersConditions
    ? filtersConditions.join(" and ")
    : undefined;

  const sortings = Object.entries(orderBy)
    .map((val) => {
      if (val[0] === "tags") {
        return `tags/$count ${val[1]}`;
      }
      return val.join(" ");
    })
    .join(", ");

  const params = {
    $skip: 0,
    $top: 30,
    $filter: $filter ? $filter : undefined,
    $orderby: sortings ? sortings : undefined,
  };

  return params;
};
