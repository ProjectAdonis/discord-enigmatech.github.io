document.addEventListener("DOMContentLoaded", function () {
  const iconLinks = {
    Processor: "https://img.icons8.com/tiny-color/16/processor.png",
    Fan: "https://img.icons8.com/tiny-color/16/fan.png",
    Motherboard: "https://img.icons8.com/tiny-color/16/motherboard.png",
    RAM: "https://img.icons8.com/tiny-color/16/memory-slot.png",
    SSD: "https://img.icons8.com/tiny-color/16/ssd.png",
    "Video Card": "https://img.icons8.com/tiny-color/16/video-card.png",
    Case: "https://img.icons8.com/tiny-color/16/server.png",
    PSU: "https://img.icons8.com/tiny-color/16/hdd.png",
  };

  const grid = document.querySelector(".grid.g_three.config");
  const radioButtons = document.querySelectorAll('.budget-filter input[type="radio"]');

  function filterPosts() {
    console.log("filterPosts function called");
    const selectedRadio = document.querySelector('.budget-filter input[type="radio"]:checked');
    const selectedValue = selectedRadio ? selectedRadio.nextElementSibling.textContent : "";
    console.log("Selected value:", selectedValue);

    const posts = document.querySelectorAll(".post");
    console.log("Number of posts:", posts.length);

    posts.forEach((post) => {
      const priceText = post.querySelector("h3").textContent;
      const price = parseInt(priceText.match(/\d+/)[0]);
      console.log("Post price:", price);

      if (selectedValue === "Tout") {
        post.style.display = "block";
      } else if (selectedValue.includes("Petit budget") && price <= 1000) {
        post.style.display = "block";
      } else if (selectedValue.includes("Moyen budget") && price >= 1200 && price <= 1600) {
        post.style.display = "block";
      } else if (selectedValue.includes("Grand budget") && price > 1600) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", filterPosts);
  });
  
  fetch("../json/configs-pc.json")
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.forEach((config) => {
        const post = document.createElement("div");
        post.className = "post";

        const h3 = document.createElement("h3");
        h3.textContent = config.name;

        const date = document.createElement("div");
        date.className = "date";
        date.textContent = config.date;

        const p = document.createElement("p");
        p.textContent = config.description;

        const ul = document.createElement("ul");
        config.parts.forEach((part) => {
          const li = document.createElement("li");

          const img = document.createElement("img");
          img.className = "pc-icon";
          img.src = iconLinks[part.type] || "";
          img.alt = part.name;

          const a = document.createElement("a");
          a.target = "_blank";
          a.href = part.link;
          a.textContent = part.name;

          const icon = document.createElement("i");
          icon.className = "fa-solid fa-arrow-up-right-from-square fa-2xs";

          a.appendChild(icon);
          li.appendChild(img);
          li.appendChild(a);
          ul.appendChild(li);
        });

        const tags = document.createElement("div");
        tags.className = "tags";
        config.tags.forEach((tag) => {
          const a = document.createElement("a");
          a.href = "#";
          a.textContent = tag;
          tags.appendChild(a);
        });

        // Set the custom CSS property to control the ::before pseudo-element
        tags.style.setProperty("--tags-before-display", "block");

        post.appendChild(h3);
        post.appendChild(date);
        post.appendChild(p);
        post.appendChild(ul);
        post.appendChild(tags);

        grid.appendChild(post);
      });
      setTimeout(filterPosts, 0);
    });
});
