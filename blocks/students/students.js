import { fetchPlaceholders, getMetadata, createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const locale = getMetadata('locale');
  const placeholders = await fetchPlaceholders(locale);
  const { clickHere } = placeholders;

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, i) => {
      if (i === 1) div.textContent = clickHere;
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'students-card-image';
      else div.className = 'students-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
