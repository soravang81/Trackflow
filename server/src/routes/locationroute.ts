import { Router } from 'express';
import { updateLocation, getLocation, setLocation } from '../controllers/location';
import { authenticate } from '../middleware/authmiddleware';

const router = Router();

router.use(authenticate);

router.post('/update', updateLocation); // Delivery partner sends location
router.get('/:orderId', getLocation);   // Customer gets current location
router.post('/set/', setLocation);
 
export default router;
