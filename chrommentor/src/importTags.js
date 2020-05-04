import { getTagsOptions } from "./utils/getTagsOptions";
import { constructOptions } from "./displayTags";

const readFile = (event) => {
  const reader = new FileReader();
  reader.onload = storeTags;
  reader.readAsText(event.target.files[0]);
};

const storeTags = (event) => {
  const tags = JSON.parse(event.target.result);
  chrome.storage.sync.set({
    tagsOptions: tags,
  });
  constructOptions(tags);
};

document.getElementById("import").addEventListener("change", readFile, false);
