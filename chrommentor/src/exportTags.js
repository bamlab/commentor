import { getTagsOptions } from "./utils/getTagsOptions";

const exportTags = async () => {
  const tagsOptions = await getTagsOptions();
  const hrefString =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(tagsOptions));
  var hiddenAnchor = document.createElement("a");
  hiddenAnchor.setAttribute("href", hrefString);
  hiddenAnchor.setAttribute("download", "chrommentor.json");
  hiddenAnchor.click();
};
document.getElementById("export").onclick = exportTags;
