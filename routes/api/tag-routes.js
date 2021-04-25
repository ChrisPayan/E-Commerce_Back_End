const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
        include: [{ model: Product }],
    });
    res.status(200).json(tags);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk( req.params.id, {
        include: [{ model: Product }],
    });
    if(!tags){
      res.status(404).json({message: "tag does not exist"});
    } else {
      res.status(200).json(tags);
    } 
    } catch (err) {
    res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update( req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!tags){
      res.status(404).json({message: "tag does not exist"});
    } else {
      res.status(200).json(tags);
    } 
    } catch (err) {
    res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tags = await Tag.delete({
      where: {
        id: req.params.id,
      },
    });
    if(!tags){
      res.status(404).json({message: "tag does not exist"});
    } else {
      res.status(200).json(tags);
    } 
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;
