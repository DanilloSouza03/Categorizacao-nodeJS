function normalizeString(str) {
    return str
      .toLowerCase()
      .replace(/-/g, ' ')
      .replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  
  function categorizeProducts(products) {
    const categories = {};
  
    for (const product of products) {
      let normalizedTitle = normalizeString(product.title);
  
      normalizedTitle = normalizedTitle.replace(/1\s*quilo/g, '1kg');
      normalizedTitle = normalizedTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      normalizedTitle = normalizedTitle.replace(/\b(de|da|do|tipo|congelado|fresco|patinho|zero\s*lactose|sem\s*lactose|fatiado)\b/g, '').replace(/\s+/g, ' ');
      normalizedTitle = normalizedTitle.replace(/\s1\s(?=\dkg)/, ' ');
      normalizedTitle = normalizedTitle.replace(/1000ml|1\s*litro/g, '1l').replace(/5\s*quilos/g, '5kg').replace(/500\s*gramas/g, '500g').replace(/1000g/g, '1kg');
      normalizedTitle = normalizedTitle.trim();
  
      const sortedWords = normalizedTitle.split(' ').sort();
      const key = sortedWords.join(' ');
  
      if (!categories[key]) {
        categories[key] = {
          category: product.title,
          count: 0,
          products: [],
        };
      }
  
      categories[key].count++;
      categories[key].products.push(product);
      // console.log(`Original: ${product.title} \n Normalized: ${normalizedTitle} \n Key: ${key}`);
    }
  
    return Object.values(categories);
  }
  
  module.exports = {
    categorizeProducts,
  };