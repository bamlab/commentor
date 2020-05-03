let page = document.getElementById("optionsDiv");

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
          constructOptions(tagsOptions);
        });
      }
    );
  } else {
    constructOptions(tagsOptions);
  }
  constructTagInput(page);
});

function constructTagInput(container) {
  chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
    const tagLabelInput = document.createElement("input");
    tagLabelInput.setAttribute("id", "tagLabelInput");
    const tagDescriptionInput = document.createElement("input");
    tagDescriptionInput.setAttribute("id", "tagDescriptionInput");
    const inputButton = document.createElement("button");
    inputButton.textContent = "Add tag";
    inputButton.addEventListener("click", () => {
      addTag(tagsOptions);
    });
    container.appendChild(tagLabelInput);
    container.appendChild(tagDescriptionInput);
    container.appendChild(inputButton);
  });
}

function addTag(existingTagsOptions) {
  const descriptionInputValue = document.getElementById("tagDescriptionInput")
    .value;
  const labelInputValue = document.getElementById("tagLabelInput").value;
  if (descriptionInputValue && labelInputValue) {
    document.getElementById("tagDescriptionInput").value = null;
    document.getElementById("tagLabelInput").value = null;
    chrome.storage.sync.set(
      {
        tagsOptions: [
          ...existingTagsOptions,
          {
            description: descriptionInputValue,
            label: labelInputValue
          }
        ]
      },
      () => {
        chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
          constructOptions(tagsOptions);
        });
      }
    );
  }
}

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
