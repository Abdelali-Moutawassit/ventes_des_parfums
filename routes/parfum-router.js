const express = require("express")
const router = express.Router()
const Parfum = require('../models/Parfum'); 
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');


// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

// Route to add a product to the cart
router.post('/add-to-cart/:productId', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        // Check if the product already exists in the cart
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            // If the product exists, increase the quantity
            cart.products[productIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.redirect('/parfum');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to add a product to the wishlist
router.post('/add-to-wishlist/:productId', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        // Find the user's cart or create a new one if it doesn't exist
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        // Check if the product already exists in the cart
        const productIndex = wishlist.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            // If the product exists, increase the quantity
            wishlist.products[productIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart
            wishlist.products.push({ product: productId, quantity: 1 });
        }

        await wishlist.save();
        res.redirect('/parfum');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Route pour supprimer un produit du panier
router.post('/delete/:productId', ensureAuthenticated, async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user._id;

        // Trouver le panier de l'utilisateur
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        // Filtrer les produits pour retirer celui spécifié
        cart.products = cart.products.filter(product => product.product.toString() !== productId);

        // Sauvegarder le panier mis à jour
        await cart.save();

        // Rediriger ou envoyer une réponse de succès
        res.redirect('/');
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).send('Internal Server Error');
    }
});


router.get("/", async (req, res) => {
    try {
        // Récupérer les trois premiers produits
        const parfums = await Parfum.find().limit(3);
        const parfumsNext = await Parfum.find().skip(3).limit(5);
        const parfumsNextNext = await Parfum.find().skip(2).limit(18);
        //Recuperer la cart
        // Initialiser la cart comme vide
        let cart = { products: [] };
        if (req.isAuthenticated()) {
            cart = await Cart.findOne({ user: req.user._id }).populate('products.product') || cart;
        }

        //Recuperer la wishlist
        // Initialiser la wishlist comme vide
        let wishlist = { products: [] };
        if (req.isAuthenticated()) {
            wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product') || wishlist;
        }

        
        // Rendre la vue 'home' et passer les produits récupérés
        res.render('parfums/home', { parfums, parfumsNext, parfumsNextNext , cart , wishlist });
    } catch (err) {
        console.error('Error fetching perfumes:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/checkout", ensureAuthenticated, async (req, res) => {
    try {
        // Récupérer les trois premiers produits
        const parfums = await Parfum.find().limit(3);
        const parfumsNext = await Parfum.find().skip(3).limit(5);
        const parfumsNextNext = await Parfum.find().skip(2).limit(18);
        //Recuperer la cart
        // Initialiser la cart comme vide
        let cart = { products: [] };
        if (req.isAuthenticated()) {
            cart = await Cart.findOne({ user: req.user._id }).populate('products.product') || cart;
        }

        //Recuperer la wishlist
        // Initialiser la wishlist comme vide
        let wishlist = { products: [] };
        if (req.isAuthenticated()) {
            wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product') || wishlist;
        }


        // Rendre la vue 'home' et passer les produits récupérés
        res.render('parfums/cart2', { parfums, parfumsNext, parfumsNextNext, cart, wishlist });
    } catch (err) {
        console.error('Error fetching perfumes:', err);
        res.status(500).send('Internal Server Error');
    }
})

router.get("/products", async (req, res) => {
    try {
        //Recuperer all products
        const parfums = await Parfum.find().limit(18);
        const parfumsNext = await Parfum.find().skip(3).limit(4);
        let cart = { products: [] };
        if (req.isAuthenticated()) {
            cart = await Cart.findOne({ user: req.user._id }).populate('products.product') || cart;
        }

        //Recuperer la wishlist
        // Initialiser la wishlist comme vide
        let wishlist = { products: [] };
        if (req.isAuthenticated()) {
            wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product') || wishlist;
        }

        // Rendre la vue 'home' et passer le panier récupéré
        res.render('parfums/products', { cart , parfums , parfumsNext , wishlist});
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/stores", async (req, res) => {
    try {
        //Recuperer all products
        const parfumsA = await Parfum.find().limit(3);
        const parfums = await Parfum.find().limit(18);
        const parfumsNext = await Parfum.find().skip(3).limit(4);
        let cart = { products: [] };
        if (req.isAuthenticated()) {
            cart = await Cart.findOne({ user: req.user._id }).populate('products.product') || cart;
        }

        //Recuperer la wishlist
        // Initialiser la wishlist comme vide
        let wishlist = { products: [] };
        if (req.isAuthenticated()) {
            wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product') || wishlist;
        }

        // Rendre la vue 'home' et passer le panier récupéré
        res.render('parfums/storeCategorie', { cart, parfums, parfumsNext , parfumsA , wishlist });
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).send('Internal Server Error');
    }
});

const ITEMS_PER_PAGE = 9; // Number of items per page

router.get("/store", async (req, res) => {
    try {
        // Get the page number from the query string, default to 1 if not provided
        const page = parseInt(req.query.page) || 1;

        // Calculate the number of items to skip
        const skip = (page - 1) * ITEMS_PER_PAGE;

        const parfumsA = await Parfum.find().limit(3);

        // Get the total number of products for pagination
        const totalProducts = await Parfum.countDocuments();

        // Get the products for the current page
        const parfums = await Parfum.find().skip(skip).limit(ITEMS_PER_PAGE);

        let cart = { products: [] };
        if (req.isAuthenticated()) {
            cart = await Cart.findOne({ user: req.user._id }).populate('products.product') || cart;
        }

        //Recuperer la wishlist
        // Initialiser la wishlist comme vide
        let wishlist = { products: [] };
        if (req.isAuthenticated()) {
            wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product') || wishlist;
        }

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

        // Render the view and pass the products, cart, and pagination info
        res.render('parfums/storeCategorie', { cart, parfums, totalPages, currentPage: page, totalProducts , parfumsA , wishlist });
    } catch (err) {
        console.error('Error fetching products or cart:', err);
        res.status(500).send('Internal Server Error');
    }
});






module.exports = router