const fs = require("fs");
const data = require('./data01.json');
const { categorizeProducts } = require('./normalize');

const categorizedData = categorizeProducts(data);

try {
  fs.writeFileSync('categorized_products.json', JSON.stringify(categorizedData, null, 2));
  console.log('File "categorized_products.json" created succesfully!');

} catch (error) {
  console.log(`Error:${error}`)
}