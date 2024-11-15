function createTable(jsonData) {
  const itemList = document.createElement('ul');
  itemList.classList.add('list');

  jsonData.forEach((item) => {
    // console.log('item----------:', item);
    const li = document.createElement('li');
    li.classList.add('list-item');

    // Create a <span> for the name
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('item-label');
    nameSpan.textContent = item.items;

    // Create a <span> for the category
    const categorySpan = document.createElement('span');
    categorySpan.classList.add('item-val');
    categorySpan.textContent = item.nutrients;

    // Append the name and category spans to the <li> element
    li.appendChild(nameSpan);
    li.appendChild(categorySpan);
    itemList.appendChild(li);
  });
  return itemList;
}

async function itemsList(url) {
  const pathname = new URL(url);
  const res = await fetch(pathname);
  // console.log('response--------',res);
  const jsonData = await res.json();
  // console.log('json---------------:', pathname, jsonData.data);

  return createTable(jsonData.data);
}

export default async function decorate(block) {
  const items = block.querySelector('a[href*=".json"]');
  // console.log('items:', items.href, block);
  const itemList = await itemsList(items.href);
  const pdiv = document.createElement('div');
  pdiv.append(itemList);
  items.replaceWith(pdiv);
}
