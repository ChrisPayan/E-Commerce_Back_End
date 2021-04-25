const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
        include: [{ model: Product }],
    });
    res.status(200).json(categories);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value,
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk( req.params.id, {
        include: [{ model: Product }],
    });
    if(!categories){
      res.status(404).json({message: "category does not exist"});
    } else {
      res.status(200).json(categories);
    } 
    } catch (err) {
    res.status(500).json(err);
    }
   
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update( req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!categories){
      res.status(404).json({message: "category does not exist"});
    } else {
      res.status(200).json(categories);
    } 
    } catch (err) {
    res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.delete({
      where: {
        id: req.params.id,
      },
    });
    if(!categories){
      res.status(404).json({message: "category does not exist"});
    } else {
      res.status(200).json(categories);
    } 
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;
