const defaultTagsOptions = [
  { label: "✅", description: "Tests" },
  { label: "♻️", description: "Refactoring" },
  { label: "📱", description: "Front Architecture" },
  { label: "🏗", description: "Back Architecture" },
  { label: "⚡️", description: "Performance" },
  { label: "✂️", description: "Commits" },
  { label: "🏷", description: "Typing" },
  { label: "🔖", description: "Naming" },
  { label: ":readable:", description: "Readable" },
  { label: ":solid:", description: "SOLID principles" },
  { label: "🔨", description: "Other" },
  { label: ":todo:", description: "Todo" },
];

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
    if (!tagsOptions || tagsOptions.length === 0) {
      chrome.storage.sync.set({
        tagsOptions: defaultTagsOptions,
      });
    }
  });
});
