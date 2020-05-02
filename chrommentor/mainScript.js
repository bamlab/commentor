const expanderList = document.querySelectorAll("text-expander");

chrome.storage.sync.get("tagsOptions", ({ tagsOptions }) => {
  for (let expander of expanderList) {
    const existingKeys = expander.getAttribute("keys");
    expander.setAttribute("keys", `${existingKeys} $`);

    expander.addEventListener("text-expander-change", event => {
      const textArea = Array.from(event.target.childNodes).find(
        childNode => childNode.name === "comment[body]"
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
        const filteredTagsOptions = tagsOptions.filter(tag =>
          tag.includes(lastWord.substring(1))
        );

        if (filteredTagsOptions.length > 0) {
          // Create list items elements
          for (let tag of filteredTagsOptions) {
            const item = document.createElement("li");
            item.setAttribute("role", "option");
            const clickEventListener = item.addEventListener("click", () => {
              if (textWords.length === 1) {
                textArea.value = tag;
              } else if (textWords.length === 2) {
                textArea.value = `${textWords[0]} ${tag}`;
              } else {
                let updatedText = textWords[0];
                for (let i = 1; i < textWords.length - 1; i++) {
                  updatedText = `${updatedText} ${textWords[i]}`;
                }
                textArea.value = `${updatedText} ${tag}`;
              }
              item.removeEventListener("click", clickEventListener);
            });
            item.textContent = tag;
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
              setTimeout(
                () => menuElement.parentNode.removeChild(menuElement),
                500
              );
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
});
