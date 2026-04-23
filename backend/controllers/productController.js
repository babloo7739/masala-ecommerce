// const Product = require("../models/Product");

// // ✅ FIXED: Search name + description + category teeno me
// const getProducts = async (req, res) => {
//   try {
//     const keyword = req.query.keyword
//       ? {
//           $or: [
//             { name: { $regex: req.query.keyword, $options: "i" } },
//             { description: { $regex: req.query.keyword, $options: "i" } },
//             { category: { $regex: req.query.keyword, $options: "i" } },
//           ],
//         }
//       : {};

//     const category = req.query.category
//       ? { category: req.query.category }
//       : {};

//     const products = await Product.find({ ...keyword, ...category });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) res.json(product);
//     else res.status(404).json({ message: "Product not found" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const created = await product.save();
//     res.status(201).json(created);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     Object.assign(product, req.body);
//     const updated = await product.save();
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     await product.deleteOne();
//     res.json({ message: "Product removed" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const addReview = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );
//     if (alreadyReviewed)
//       return res.status(400).json({ message: "Already reviewed" });

//     const review = {
//       user: req.user._id,
//       name: req.user.name,
//       rating: Number(req.body.rating),
//       comment: req.body.comment,
//     };

//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((acc, r) => acc + r.rating, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ message: "Review added" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   addReview,
// };


const Product = require("../models/Product");

// ✅ COMPLETELY FIXED - Better query construction
const getProducts = async (req, res) => {
  try {
    console.log("📦 GET /api/products - Query params:", req.query);
    
    let query = {};
    
    // Handle keyword search (name, description, OR category)
    if (req.query.keyword && req.query.keyword.trim() !== "") {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
        { category: { $regex: req.query.keyword, $options: "i" } },
      ];
    }
    
    // Handle category filter (only if provided and not "All")
    if (req.query.category && req.query.category.trim() !== "" && req.query.category !== "All") {
      query.category = req.query.category;
    }
    
    console.log("🔍 MongoDB Query:", JSON.stringify(query, null, 2));
    
    const products = await Product.find(query);
    
    console.log(`✅ Found ${products.length} products`);
    res.json(products);
    
  } catch (error) {
    console.error("❌ Error in getProducts:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log(`📦 GET /api/products/${req.params.id}`);
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("❌ Error in getProductById:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log("📦 POST /api/products - Body:", req.body);
    const product = new Product(req.body);
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    console.error("❌ Error in createProduct:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(`📦 PUT /api/products/${req.params.id}`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error("❌ Error in updateProduct:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log(`📦 DELETE /api/products/${req.params.id}`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("❌ Error in deleteProduct:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    console.log(`📝 POST /api/products/${req.params.id}/review - User: ${req.user?._id}`);
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
    
  } catch (error) {
    console.error("❌ Error in addReview:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
};


