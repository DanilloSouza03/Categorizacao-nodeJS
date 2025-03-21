const fs = require('fs');

fs.readFile('categorized_products.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    try {
        const dataJSON = JSON.parse(data)

        let totalProducts = 0;
        let allPrices = [];
        let categoryStats = [];

        dataJSON.forEach(item => {
            totalProducts += item.count;

            const prices = item.products.map(prod => prod.price);
            allPrices.push(...prices);

            categoryStats.push({
                category: item.category,
                count: item.count,
                min_price: Math.min(...prices),
                max_price: Math.max(...prices),
                mean_price: parseFloat((prices.reduce((sum, price) => sum + price, 0) / item.count).toFixed(2))
            });
        });

        categoryStats.sort((a, b) => a.category.localeCompare(b.category));

        console.log("Resumo Estatístico dos Produtos:");
        console.table(categoryStats);

        console.log("Total de categorias:", dataJSON.length);
        console.log("Total de produtos:", totalProducts);
    } catch (error) {
        console.error('Erro ao processar JSON:', error);
    }
});