let page = document.getElementById("optionsDiv");
let storedTagsOptions = [];

const defaultTagsOptions = [
  { label: "✅", description: "Tests" },
  { label: "♻️", description: "Refactoring" },
  { label: "📱", description: "Front Architecture" },
  { label: "🏗", description: "Back Architecture" },
  { label: "⚡️", description: "Performance" },
  { label: "✂️", description: "Commits" },
  { label: "🏷", description: "Typing" },
  { label: "🔖", description: "Namming" },
  { label: ":readable:", description: "Readable" },
  { label: ":solid:", description: "SOLID principles" },
  { label: "🔨", description: "Other" },
  { label: ":todo:", description: "Todo" }
];

chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
  if (tagsOptions.length === 0) {
    chrome.storage.sync.set(
      {
        tagsOptions: defaultTagsOptions
      },
      () => {
        chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
          console.log("tagsOptions", tagsOptions);
          storedTagsOptions = tagsOptions;
          constructOptions(storedTagsOptions);
          const tagLabelInput = document.createElement("input");
          tagLabelInput.setAttribute("id", "tagLabelInput");
          const tagDescriptionInput = document.createElement("input");
          tagDescriptionInput.setAttribute("id", "tagDescriptionInput");
          const inputButton = document.createElement("button");
          inputButton.textContent = "Add tag";
          inputButton.addEventListener("click", () => {
            const descriptionInputValue = document.getElementById(
              "tagDescriptionInput"
            ).value;
            const labelInputValue = document.getElementById("tagLabelInput")
              .value;
            if (descriptionInputValue && labelInputValue) {
              document.getElementById("tagDescriptionInput").value = null;
              document.getElementById("tagLabelInput").value = null;
              console.log("before setting tags options", labelInputValue);
              chrome.storage.sync.set(
                {
                  tagsOptions: [
                    ...storedTagsOptions,
                    {
                      description: descriptionInputValue,
                      label: labelInputValue
                    }
                  ]
                },
                () => {
                  chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
                    console.log("gotten tags options", tagsOptions);
                    storedTagsOptions = tagsOptions;
                    constructOptions(storedTagsOptions);
                  });
                }
              );
            }
          });
          page.appendChild(tagLabelInput);
          page.appendChild(tagDescriptionInput);
          page.appendChild(inputButton);
        });
      }
    );
  }
});

function constructOptions(tagsOptions) {
  const table = document.getElementById("tags-options-table");
  console.log(table);
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
