import { sortAndFilterLabels } from "../sortAndFilterLabels";

describe("sortAndFilterLabels", () => {
  it("returns first the elements starting with the query", () => {
    const list = [
      { description: "Design" },
      { description: "Refactoring" },
      { description: "Naming" },
      { description: "Other" },
    ];
    expect(sortAndFilterLabels(list, "n")[0].description).toBe("Naming");
    expect(sortAndFilterLabels(list, "na")[0].description).toBe("Naming");
  });
  it("does not return duplicate elements", () => {
    const list = [
      { description: "Design" },
      { description: "Refactoring" },
      { description: "Naming" },
      { description: "Other" },
    ];
    expect(
      sortAndFilterLabels(list, "n").filter((t) => t.description === "Naming")
        .length
    ).toBe(1);
  });
  it("does not return elements not matching", () => {
    const list = [
      { description: "Design" },
      { description: "Refactoring" },
      { description: "Naming" },
      { description: "Other" },
    ];
    expect(sortAndFilterLabels(list, "n").length).toBe(3);
  });
});
