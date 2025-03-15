// seeds/seed.js
const mongoose = require('mongoose');
const Parfum = require('../models/Parfum');


// Sample data for perfumes
const parfums = [
    {
        name: 'AMEER AL OUD',
        price: 199.00,
        description: 'A sophisticated and fresh fragrance for men.',
        image: 'https://kvepaluanalogai.lt/6285-thickbox_default/fragrance-world-ameer-al-oud-special-edition-vip-arabu-sedevro-aromatas-vyrams-ir-moterims-edp-100ml.jpg',
        stock: 10
    },
    {
        name: 'QAED AL FURSAN',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://cdn.youcan.shop/stores/ac984be85912c2dc1e317ae7b691680b/others/EqoCQIP0ew2vedGpsvdlp3gCmYoLwmHEjwwDAGLM.jpeg',
        stock: 15
    },
    {
        name: 'ASAD',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://haytamparfumerie.com/cdn/shop/files/Asad.webp?v=1691086910',
        stock: 15
    },
    {
        name: 'BLUE DE CHANEL',
        price: 199.00,
        description: 'A sophisticated and fresh fragrance for men.',
        image: 'https://puls-img.chanel.com/1683797550578-editopush1080x1150parfjpg_1150x1080.jpg',
        stock: 10
    },
    {
        name: 'INVICTUS',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://i5.walmartimages.com/seo/Paco-Rabanne-Invictus-EDT-Spray-for-Men-3-4-Oz_a2573aca-ed5a-4eab-9014-dbb2cc5d0156.da4fe64ad49a4f2eff0360404571b7cf.jpeg',
        stock: 15
    },
    {
        name: 'NOW',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://monsieurdupeparfum.com/cdn/shop/files/61vNbqiWPAL._AC_SX679.jpg?v=1710501142',
        stock: 15
    },
    {
        name: 'YARA',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://i5.walmartimages.com/seo/Paco-Rabanne-Invictus-EDT-Spray-for-Men-3-4-Oz_a2573aca-ed5a-4eab-9014-dbb2cc5d0156.da4fe64ad49a4f2eff0360404571b7cf.jpeg',
        stock: 15
    },
    {
        name: 'ASAD',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://www.jatechnomarinepr.com/cdn/shop/files/6A7409C6-89D0-47A2-B8F1-1FF0B395AE14.jpg?v=1712166192',
        stock: 15
    },
    {
        name: 'LINTRUDE',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://cdn.youcan.shop/stores/ac984be85912c2dc1e317ae7b691680b/products/DG1bUUjAxpy8bpiJVq9Y3Pd39TShsYy9JPcjPqJw.png',
        stock: 15
    },
    {
        name: 'EMAAN',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://m.media-amazon.com/images/I/71fFGBT6AqL._AC_UF1000,1000_QL80_.jpg',
        stock: 15
    },
    {
        name: 'COMO MOISELLE',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://haytamparfumerie.com/cdn/shop/files/BmqfClXe23YA1t1Tw6OWprlqgIvbPQCglPBuc4SO.png?v=1707995222',
        stock: 15
    },
    {
        name: 'PEGASUS',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://www.fatin.ma/wp-content/uploads/2021/11/Parfums_de_Marly_pegasus_1.jpg',
        stock: 15
    },
    {
        name: 'AL NASHAMA',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://i.ebayimg.com/images/g/XJ8AAOSwP9dljY-q/s-l1200.jpg',
        stock: 15
    },
    {
        name: 'FAKHAR AL OUD',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/82/308156/1.jpg?5145',
        stock: 15
    },
    {
        name: 'TAJ AL MALIK',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/70/122284/1.jpg?2830',
        stock: 15
    },
    {
        name: 'AJWAD',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://www.oudmalaki.com/wp-content/uploads/2022/05/Ajwad-800x800-2.webp',
        stock: 15
    },
    {
        name: 'ANDALEEB',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://haytamparfumerie.com/cdn/shop/products/lattafa-perfumes-perfume-andaleeb-asdaaf-eau-de-pa.jpg?v=1681486622',
        stock: 15
    },
    {
        name: 'YARA',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/74/6008/1.jpg?3726',
        stock: 15
    },
    {
        name: 'AJWAD',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://m.media-amazon.com/images/I/71310uGH+IL._SL1080_.jpg',
        stock: 15
    },
    {
        name: 'AL SAYAAD',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://www.marjanemall.ma/media/catalog/product/cache/36c9d346b6653f95ce7222f403adb694/_/p/_pdt2_7_8_4_1_700x700_AAAAH09784_2.jpg',
        stock: 15
    },
    {
        name: 'BAB AL HAMRA',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://haytamparfumerie.com/cdn/shop/files/IMG-2477.jpg?v=1716135862',
        stock: 15
    },
    {
        name: 'OPERA NOIR',
        price: 299.00,
        description: 'A powerful and fresh fragrance for men.',
        image: 'https://haytamparfumerie.com/cdn/shop/files/al_hambra_opera_noir_edp_100ml_copy_1.jpg?v=1691087071',
        stock: 15
    },
   
];

// Function to seed the database
const seedDB = async () => {
    try {
        await Parfum.deleteMany({});
        await Parfum.insertMany(parfums);
        console.log('Database seeded with perfumes!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
    }
};

mongoose.connect('mongodb://127.0.0.1:27017/ParfumssStore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database successfully...');
        seedDB();
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
