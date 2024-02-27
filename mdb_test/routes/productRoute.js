const express = require("express");
const router = express.Router();
const {
  createproductcontroller,
  getAllProductsController,
  getProductById,
  deleteProduct,
  updateProduct
} = require("../controllers/productControllers");
const {uploadProductImageLocal}=require("../controllers/uploadsController")
router.route("/").post(createproductcontroller).get(getAllProductsController);
router.route("/:id").get(getProductById).delete(deleteProduct).patch(updateProduct);
router.route("/uploads").post(uploadProductImageLocal)
// .route('/')
// .post(upload.single('homework'), (req,res,next)=>{
//     const {classe } = req.body
//     homework.create({
//      //  homework:"/backend/uploads/" + req.file.filename,classe
//        homework: req.file.filename,classe
//     })
    
//     .then((homework,classe) => {
      
//           res.status(201).json({ message: "homework was added successfully" });
//         })
//         .catch((err) => {
//         //   next(new Error(err));
//         });

// })

module.exports = router;
