import { Router } from 'express';
import UserRouter from './user-routes';

const router = Router();

router.use('/users', UserRouter); 

router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;