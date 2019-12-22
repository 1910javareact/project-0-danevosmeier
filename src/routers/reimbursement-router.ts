import express from 'express';
import * as reimbursementsServices from "../services/reimbursement-services"
import { authorization } from '../middleware.ts/auth-middleware';


export const reimbursementsRouter = express.Router()

//finding reimbursements by status
reimbursementsRouter.get('/status/:statusId', authorization([1], true), 
    async (req, res) => {
    console.log(req.params);


        let id = +req.params.statusId;
        console.log(id);

        if (isNaN(id)) {
            res.status(400).send('Invalid statusId')
        } else {
            try {
                let reimbursements = await reimbursementsServices.getReimbursementsByStatusId(id)
                res.json(reimbursements)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        }
    })

//getting reimbursements by userId
reimbursementsRouter.get('/author/userId/:userId', authorization([1], true), 
    async (req, res) => {
        let userId = +req.params.userId
        if (isNaN(userId)) {
            res.status(400).send('Invalid userId')
        } else {
            try {
                let reimbursements = await reimbursementsServices.getReimbursementsByUserId(userId)
                res.json(reimbursements)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        }
    })

//submitting a reimbursement
reimbursementsRouter.post('', authorization([1, 2, 3]), 
    async (req, res) => {
        let { body } = req
        let post = {
            author: req.session.user.userId,
            amount: body.amount,
            description: body.description,
            type: body.type
        }
        for (let key in post) {
            if (!post[key]) {
                res.status(400).send('Please include all fields')
            }
        }
        try {
            let newPost = await reimbursementsServices.postReimbursement(post)
            res.status(201).json(newPost)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    })

//updatting a reimbursement
// only admins can update a request, approve or deny them
reimbursementsRouter.patch('', authorization([1]),
    async (req, res) => {
        let { body } = req
        let patch = {
            reimbursementId: body.reimbursementId,
            resolver: req.session.user.userId,
            status: body.status
        }
        for (let key in patch) {
            if (!patch[key]) {
                res.status(400).send('Please include a status and reimbursement Id')
            }
        }
        try {
            let newPost = await reimbursementsServices.patchReimbursement(patch)
            res.status(201).json(newPost)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    })