export function constructOptions(tagsOptions) {
  const table = document.getElementById("tags-options-table");
  const newTable = document.createElement("table");
  newTable.setAttribute("id", "tags-options-table");
  const tagTableHeader = document.createElement("tr");
  const tagTableHeaderLabel = document.createElement("th");
  tagTableHeaderLabel.textContent = "Label";
  const tagTableHeaderDescription = document.createElement("th");
  tagTableHeaderDescription.textContent = "Description";
  tagTableHeader.appendChild(tagTableHeaderLabel);
  tagTableHeader.appendChild(tagTableHeaderDescription);
  newTable.appendChild(tagTableHeader);

  for (let tagOption of tagsOptions) {
    let tagOptionRow = document.createElement("tr");
    let tagOptionLabelCell = document.createElement("td");
    let tagOptionDescriptionCell = document.createElement("td");
    tagOptionLabelCell.textContent = tagOption.label;
    tagOptionDescriptionCell.textContent = tagOption.description;
    tagOptionRow.appendChild(tagOptionLabelCell);
    tagOptionRow.appendChild(tagOptionDescriptionCell);
    newTable.appendChild(tagOptionRow);
  }
  table.replaceWith(newTable);
}
