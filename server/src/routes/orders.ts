import e, { Router } from 'express';
import {
  getVendorOrders,
  assignpartner,
  getAssignedOrder,
  createOrder,
  getCustomerOrders,
} from '../controllers/orders';
import { authenticate } from '../middleware/authmiddleware';

const router = Router();

router.use(authenticate);
// router.use(e.json());

router.get('/vendor', getVendorOrders); // Vendor orders
router.post('/vendor/create', createOrder); // Vendor creates dummy order
router.post('/assign', assignpartner); // Vendor assigns delivery partner
router.get('/customer' , getCustomerOrders)

router.get('/delivery/assigned', getAssignedOrder); // Delivery partner fetches assigned order

export default router;
