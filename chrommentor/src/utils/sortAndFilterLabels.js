export const sortAndFilterLabels = (list, expression) => {
  return [
    ...list.filter((tag) =>
      tag.description.match(new RegExp(`^${expression}`, "i"))
    ),
    ...list.filter((tag) =>
      tag.description.match(
        new RegExp(
          `^(?!${expression}).*${expression}.*`, // Does not start with the query, but contains the query
          "i"
        )
      )
    ),
  ];
};
