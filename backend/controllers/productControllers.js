import asyncHandler from "express-async-handler";

import Product from '../models/productModel.js';

const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
})

const getProductById = asyncHandler(async(req,res)=>{

    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product);
    }
    else{
        res.status(401);
        throw new Error('Product not found');
    }
});

const deleteProduct = asyncHandler(async(req,res)=>{

    const product = await Product.findById(req.params.id);

    if(product){
        await product.remove();
        res.json({message: "Product Deleted Successfully"});
    }
    else{
        res.status(401);
        throw new Error('Product not found');
    }
});

const createProduct = asyncHandler(async(req,res)=>{

    const {name,price,description,categories,sizes,images,countInStock} = req.body;

    const product = new Product({
        name:name,
        price:price,
        description:description,
        category:categories,
        sizes:sizes,
        images:images,
        countInStock:countInStock || 0,
        numReviews: 0
    })

    const createdProduct = await product.save();
    res.json(createdProduct);
});

const updateProduct = asyncHandler(async(req,res)=>{
    const {name,price,description,category,sizes,images,countInStock} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.category=category;
        product.sizes=sizes;
        product.images=images;
        product.countInStock=countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else{
        res.status(401);
        throw new Error('Product not found');
    }
});

const createProductReview = asyncHandler(async(req,res)=>{
    const {rating,comment} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find(r=> r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(401);
            throw new Error('Product Already Reviewed');
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user:req.user._id
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        var sum = 0;
        product.reviews.map((review)=>(
            sum += review.rating
        ));
        product.rating = sum / product.reviews.length;
        await product.save();
        res.json({message: 'Review added'});
    }
    else{
        res.status(401);
        throw new Error('Product not found');
    }
});

export {getProducts,getProductById,createProduct,deleteProduct,updateProduct,createProductReview}