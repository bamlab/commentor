import { getTagsOptions } from "./utils/getTagsOptions";
import { constructOptions } from "./displayTags";

let page = document.getElementById("optionsDiv");

chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
  constructOptions(tagsOptions);
  constructTagInput(page);
});

const constructTagInput = async (container) => {
  const tagsOptions = await getTagsOptions();
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
};

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
            label: labelInputValue,
          },
        ],
      },
      () => {
        chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
          constructOptions(tagsOptions);
        });
      }
    );
  }
}
