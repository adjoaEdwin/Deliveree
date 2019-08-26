export const getOne = model => async (req, res) => {
  try {
    const doc = await Model.findOne({ _id: req.params.id }).lean().exec;

    if (!doc) {
      return res.status(400).end();
    }

    return res.status(200).json({ doc });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const getMany = model => async (req, res) => {
  try {
    const docs = await Model.find({})
      .lean()
      .exec();

    if (!docs) {
      return res.status(400).end();
    }

    return res.status(201).send({ docs });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const createOne = model => async (req, res) => {
  try {
    const doc = await Model.create(...req.body);

    return res.status(201).send({ doc });
  } catch (e) {
    console.log(e);

    res.status(400).end();
  }
};

export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await Model.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    return res.status(201).json({ updatedDoc });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const removeOne = model => async (req, res) => {
  try {
    const removeDoc = await Model.findOneAndRemove({ _id: req.params.id })
      .lean()
      .exec();

    if (!removeDoc) {
      return res.status(400).end();
    }

    return res.status(201).json({ removeDoc });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const crudControllers = model => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
});
