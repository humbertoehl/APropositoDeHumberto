document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section");
    const menu = document.getElementById("menu");
    const popupContainer = document.createElement("div");

    popupContainer.id = "popup-container";
    document.body.appendChild(popupContainer);

    function showSection(id) {
        sections.forEach((section) => {
            section.classList.remove("active");
            if (section.id === id) {
                section.classList.add("active");
                if (id === "poems") {
                    fillPoems();
                }
            }
        });
    }

    showSection("poems");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            showSection(targetId);
            closeMenu();
        });
    });

    function fillPoems() {
        const poemsContainer = document.getElementById("poems-container");

        if (poemsContainer.children.length > 0) return;

        fetch("poems.json")
            .then((response) => response.json())
            .then((data) => {
                data.poems.forEach((poem) => {
                    const poemSection = document.createElement("div");
                    poemSection.classList.add("poem");

                    const titleElement = document.createElement("h2");
                    titleElement.classList.add("poem-title");
                    titleElement.innerText = poem.title;

                    const contentElement = document.createElement("p");
                    contentElement.classList.add("poem-content");
                    contentElement.innerText = poem.content;

                    poemSection.appendChild(titleElement);
                    poemSection.appendChild(contentElement);

                    poemSection.addEventListener("click", () => {
                        showPopup(poem.title, poem.content);
                    });

                    checkOverflow(contentElement, poemSection);

                    poemsContainer.appendChild(poemSection);
                });
            })
            .catch((error) => console.error("Error loading poems:", error));
    }

    function checkOverflow(contentElement, poemSection) {
        setTimeout(() => {
            if (contentElement.scrollHeight > contentElement.offsetHeight) {
                const arrowElement = document.createElement("div");
                arrowElement.classList.add("poem-arrow");
                arrowElement.innerHTML = "&#x25BC;";
                poemSection.appendChild(arrowElement);
            }
        }, 50);
    }

    function toggleMenu() {
        menu.classList.toggle("hidden");
        menu.classList.toggle("visible");
    }

    function closeMenu() {
        menu.classList.add("hidden");
        menu.classList.remove("visible");
    }

    document.querySelector(".menu-icon").addEventListener("click", toggleMenu);

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !e.target.closest(".menu-icon")) {
            closeMenu();
        }
    });

    function showPopup(title, content) {
        popupContainer.innerHTML = `
            <div class="popup">
                <h2 class="popup-title">${title}</h2>
                <p class="popup-content">${content}</p>
            </div>
        `;
        popupContainer.classList.add("visible");

        popupContainer.addEventListener("click", (e) => {
            if (e.target === popupContainer) {
                closePopup();
            }
        });
    }

    function closePopup() {
        popupContainer.classList.remove("visible");
    }
});

function openLightbox(image) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = image.src;
  lightbox.classList.add("visible");
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("visible");
}

