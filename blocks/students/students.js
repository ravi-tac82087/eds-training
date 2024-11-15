import { fetchPlaceholders, getMetadata } from "../../scripts/aem.js";
import { createOptimizedPicture } from "../../scripts/aem.js";

export default async function decorate(block) {
  const locale = getMetadata("locale");
  const placeholders = await fetchPlaceholders(locale);
  const { clickHere } = placeholders;

  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, i) => {
      if (i == 1) div.textContent = div.textContent + " "+ clickHere;
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "students-card-image";
      else div.className = "students-card-body";
    });
    ul.append(li);
  });
  ul.querySelectorAll("picture > img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
      )
  );
  block.textContent = "";
  block.append(ul);
}

// async function createTable(table){
//   const locale= getMetadata("locale")
//   const placeholders= await fetchPlaceholders(locale);
//   const {firstNameKey,lastNameKey,subjectKey,gradeKey,firstName,lastName,subject,grade} = placeholders;
// //  const table = document.createElement("table");
//   table.setAttribute("border", "1");

//   // Create table rows and cells

//   const row = document.createElement("tr");
//   const cell1 = document.createElement("td");
//   cell1.appendChild(document.createTextNode(firstNameKey));
//   row.appendChild(cell1);
//   const cell2 = document.createElement("td");
//   cell2.appendChild(document.createTextNode(firstName));
//   row.appendChild(cell2);

//   table.appendChild(row);

//   // Append the table to the container
//   document.getElementById("tableContainer").appendChild(table);
// }
