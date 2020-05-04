export const getTagsOptions = () => {
  const promise = new Promise((resolve) => {
    chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
      resolve(tagsOptions);
    });
  });
  return promise;
};
