const expanderList = document.querySelectorAll("text-expander");
const addCommentButtonsList = document.querySelectorAll(
  "button.add-line-comment"
);

let selectedTagOptionIndex = 0;
let globalFilteredTagsOptions = [];

chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
  for (let expander of expanderList) {
    setupExpander(expander, tagsOptions);
  }
  for (let addCommentButton of addCommentButtonsList) {
    addCommentButton.addEventListener("click", () => {
      setTimeout(() => {
        const newExpanderList = document.querySelectorAll("text-expander");
        for (let expander of newExpanderList) {
          setupExpander(expander, tagsOptions);
        }
      }, 500);
    });
  }
});

function setupExpander(expander, tagsOptions) {
  const existingKeys = expander.getAttribute("keys");
  if (!existingKeys.includes(" $")) {
    expander.setAttribute("keys", `${existingKeys} $`);
  }

  expander.addEventListener("text-expander-change", (event) => {
    const textArea = Array.from(event.target.childNodes).find(
      (childNode) => childNode.name === "comment[body]"
    );
    if (!textArea) {
      return;
    }
    if (tagsOptions.length === 0) {
      return;
    }
    const textValue = textArea.value;
    const textWords = textValue.split(" ");
    const lastWord = textWords.length ? textWords[textWords.length - 1] : "";
    const lastWordFirstCharacter = lastWord.charAt(0);
    if (lastWordFirstCharacter === "$") {
      // Create menu element
      const menu = document.createElement("ul");
      menu.setAttribute("role", "listbox");
      menu.setAttribute("id", "comment-tag-id");
      menu.setAttribute(
        "class",
        "suggester-container suggester suggestions list-style-none position-absolute"
      );
      const textAreaWidth = textArea.getBoundingClientRect().width;
      const caretPosition = textArea.selectionStart;
      let menuLeftOffset = 20 + caretPosition * 6;
      let menuTopOffset = 9;
      while (menuLeftOffset > textAreaWidth) {
        menuLeftOffset = menuLeftOffset - textAreaWidth;
        menuTopOffset = menuTopOffset + 16;
      }
      menu.setAttribute(
        "style",
        `top: ${menuTopOffset}px; left: ${menuLeftOffset}px;`
      );
      const filteredTagsOptions = [
        ...tagsOptions.filter((tag) =>
          tag.description.match(new RegExp(`^${lastWord.substring(1)}`, "i"))
        ),
        ...tagsOptions.filter((tag) =>
          tag.description.match(
            new RegExp(
              `^(?!${lastWord.substring(1)}).*${lastWord.substring(1)}.*`, // Does not start with the query, but contains the query
              "i"
            )
          )
        ),
      ];

      if (filteredTagsOptions.length > 0) {
        globalFilteredTagsOptions = filteredTagsOptions;
        textArea.addEventListener("keydown", keydownEventListener);
        // Create list items elements
        for (let tag of filteredTagsOptions) {
          const item = document.createElement("li");
          item.setAttribute("role", "option");
          item.setAttribute("id", `chrommentor-tag-${tag.label}`);
          if (tag.label === filteredTagsOptions[0].label) {
            selectedTagOptionIndex = 0;
            item.setAttribute("aria-selected", true);
          }
          const clickEventListener = item.addEventListener("click", () => {
            if (textWords.length === 1) {
              textArea.value = tag.label;
            } else if (textWords.length === 2) {
              textArea.value = `${textWords[0]} ${tag.label}`;
            } else {
              let updatedText = textWords[0];
              for (let i = 1; i < textWords.length - 1; i++) {
                updatedText = `${updatedText} ${textWords[i]}`;
              }
              textArea.value = `${updatedText} ${tag.label}`;
            }
            item.removeEventListener("click", clickEventListener);
            textArea.focus();
          });
          item.textContent = tag.description;
          menu.append(item);
        }
        // Dismiss the select when clicking the text area
        textArea.onclick = () => {
          const menuElement = document.getElementById("comment-tag-id");
          if (menuElement && menuElement.parentNode) {
            menuElement.parentNode.removeChild(menuElement);
          }
        };

        // Make sure the menu disappears if the text area blurs
        const blurEventListener = textArea.addEventListener("blur", () => {
          const menuElement = document.getElementById("comment-tag-id");
          textArea.removeEventListener("blur", blurEventListener);
          if (menuElement && menuElement.parentNode) {
            setTimeout(() => {
              menuElement.parentNode.removeChild(menuElement);
            }, 500);
          }
        });
        const existingMenu = document.getElementById("comment-tag-id");
        if (existingMenu) {
          existingMenu.parentNode.replaceChild(menu, existingMenu);
        } else {
          event.target.append(menu);
        }
      } else {
        const menuElement = document.getElementById("comment-tag-id");
        if (menuElement && menuElement.parentNode) {
          menuElement.parentNode.removeChild(menuElement);
        }
      }
    }
  });
}

const keydownEventListener = (event) => {
  const selectedTag = globalFilteredTagsOptions[selectedTagOptionIndex];
  if (event.key === "ArrowDown") {
    const selectedElement = document.getElementById(
      `chrommentor-tag-${globalFilteredTagsOptions[selectedTagOptionIndex].label}`
    );
    selectedTagOptionIndex =
      (((selectedTagOptionIndex + 1) % globalFilteredTagsOptions.length) +
        globalFilteredTagsOptions.length) %
      globalFilteredTagsOptions.length;
    selectedElement.setAttribute("aria-selected", false);
    const toSelectElement = document.getElementById(
      `chrommentor-tag-${globalFilteredTagsOptions[selectedTagOptionIndex].label}`
    );
    toSelectElement.setAttribute("aria-selected", true);
  } else if (event.key === "ArrowUp") {
    const selectedElement = document.getElementById(
      `chrommentor-tag-${globalFilteredTagsOptions[selectedTagOptionIndex].label}`
    );
    selectedTagOptionIndex =
      (((selectedTagOptionIndex - 1) % globalFilteredTagsOptions.length) +
        globalFilteredTagsOptions.length) %
      globalFilteredTagsOptions.length;
    selectedElement.setAttribute("aria-selected", false);
    const toSelectElement = document.getElementById(
      `chrommentor-tag-${globalFilteredTagsOptions[selectedTagOptionIndex].label}`
    );
    toSelectElement.setAttribute("aria-selected", true);
  } else {
    if (event.key === "Enter") {
      const existingMenu = document.getElementById("comment-tag-id");
      if (existingMenu) {
        const textWords = event.target.value.split(" ");
        if (textWords.length === 1) {
          event.target.value = selectedTag.label;
        } else if (textWords.length === 2) {
          event.target.value = `${textWords[0]} ${selectedTag.label}`;
        } else {
          let updatedText = textWords[0];
          for (let i = 1; i < textWords.length - 1; i++) {
            updatedText = `${updatedText} ${textWords[i]}`;
          }
          event.target.value = `${updatedText} ${selectedTag.label}`;
        }
        event.target.focus();
        if (existingMenu.parentNode) {
          existingMenu.parentNode.removeChild(existingMenu);
        }
      }
    }
    event.target.removeEventListener("keydown", keydownEventListener);
  }
};
