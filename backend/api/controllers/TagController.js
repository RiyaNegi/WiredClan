import slugify from 'slugify';
import Idea from '../models/Idea';
import Tag from '../models/Tag';
import logger from '../../logger';

const config = (router) => router
  .get('/:name', async (req, res) => {
    try {
      let result = await Tag.findAll({ include: [Idea] });
      result = result.find((tag) => req.params.name.toLowerCase() === slugify(tag.text).toLowerCase());
      return res.status(200).json(result);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .get('/', async (req, res) => {
    try {
      const result = await Tag.findAll({ include: [Idea] });
      return res.status(200).json(result);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });

export default {
  path: '/tags',
  config,
};
