const _ = require('lodash');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const createdUser = await User.create(body);
    if (!createdUser) {
      return res.status(400).send('ERROR');
    }

    const preparedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });
    res.status(200).send({
      data: foundUsers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUserById = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
    });
    if (!foundUserById) {
      return res.status(404).send({ status: 404, message: 'User not found' });
    }
    res.status(200).send({ data: foundUserById });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      return res.status(404).send([{ status: 404, title: 'User not found' }]);
    }
    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      // create
      body.id = id;
      return next();
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUserCount = await User.destroy({ where: { id } });
    if (!deletedUserCount) {
      return res.status(404).end();
    }
    res.status(204).send({ data: deletedUserCount });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findByPk(id);
    if (!foundUser) {
      return res.status(404).end();
    }

    const foundUserTasks = await foundUser.getTasks({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundUserTasks });
  } catch (err) {
    next(err);
  }
};
