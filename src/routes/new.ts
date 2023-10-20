import { natsWrapper } from '../nats-wrapper';
import express, { Request, Response } from 'express';
import { validateRequest } from '@myasticketing/common'
import { TicketCreatedPublisher } from '../events/ticket-created-publisher';
import { Product } from '../entity/product.entity';
import { db } from '../app-data-source';

const { body } = require('express-validator');

const router = express.Router();

router.post('/api/products', [
    body('title').not().isEmpty().withMessage('title is required'),
    body('price').isFloat({
        gt: 0
    }).withMessage('Price must be greater than 0'),
    body('description').optional(),
], validateRequest, async (req: Request, res: Response) => {
    const { title, price, description } = req.body;
    let productRepo = await db.getRepository(Product);
    const product = await productRepo.create({
        title,
        price,
        description
    })
    // await product.save();
    // await new TicketCreatedPublisher(natsWrapper.client).publish({
    //     id: product.id,
    //     title: product.title,
    //     price: product.price,
    //     userId: product.userId
    // })
    res.status(201).send(product)
})


export { router as newProductRouter } 