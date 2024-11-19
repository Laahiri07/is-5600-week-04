const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, "data/full-products.json");

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options; // Fixed typo: 'offest' to 'offset'

  const data = await fs.readFile(productsFile);
  return JSON.parse(data)
    .filter((product) => {
      if (!tag) {
        return true; // If no tag filter is provided, include all products
      }
      return product.tags.some(({ title }) => title === tag); // Check for matching tag
    })
    .slice(offset, offset + limit); // Use corrected 'offset' for slicing
}

async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

module.exports = {
  list,
  get,
};
