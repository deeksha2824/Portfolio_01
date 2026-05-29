import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController.js';
import { contactSpamProtection } from '../middleware/spamProtection.js';
import { validateContact } from '../middleware/validate.js';

export const contactRouter = Router();

contactRouter.post('/', contactSpamProtection, validateContact, createContactMessage);
