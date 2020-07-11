import HackathonService from '../services/HackathonService';
import logger from '../../logger';

export default {
  path: '/hackathons',
  config: (router) => router
    // .get('/:name', async (req, res) => {
    //   try {
    //     const result = await HackathonService.getAllDetails({ name: req.params.name }, req.session.userId);
    //     return res.status(200).json(result);
    //   } catch (err) {
    //     logger.error(err);
    //     return res.status(500).json({ msg: 'Internal server error' });
    //   }
    // })
    .get('/:name', async (req, res) => {
      try {
        const result = await HackathonService.getAllDetails({ name: req.params.name }, req.session.userId);
        return res.status(200).json(result);
      } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }),
};
