let page = document.getElementById("optionsDiv");
let storedTagsOptions = [];

chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
  storedTagsOptions = tagsOptions;
  constructOptions(storedTagsOptions);
  const input = document.createElement("input");
  input.setAttribute("id", "tagInput");
  const inputButton = document.createElement("button");
  inputButton.addEventListener("click", () => {
    const inputValue = document.getElementById("tagInput").value;
    if (inputValue) {
      document.getElementById("tagInput").value = null;
      console.log(inputValue);
      chrome.storage.sync.set(
        { tagsOptions: [...storedTagsOptions, inputValue] },
        () => {
          chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
            storedTagsOptions = tagsOptions;
            constructOptions(storedTagsOptions);
          });
        }
      );
    }
  });
  page.appendChild(input);
  page.appendChild(inputButton);
});

function constructOptions(tagsOptions) {
  console.log("tagsOptions", tagsOptions);
  const tagOptionsList = document.createElement("ul");
  tagOptionsList.setAttribute("id", "tagOptionsList");
  for (let tagOption of tagsOptions) {
    let tagOptionListItem = document.createElement("li");
    tagOptionListItem.textContent = tagOption;
    tagOptionsList.appendChild(tagOptionListItem);
  }
  const currentList = document.getElementById("tagOptionsList");
  if (currentList) {
    currentList.replaceWith(tagOptionsList);
  } else {
    page.appendChild(tagOptionsList);
  }
}
