const express = require('express')
const router = express.Router()

const PageModel = require('../models/page')
const checkLogin = require('../middlewares/check').checkLogin

router.post('/new', checkLogin, async (req, res, next) => { // 新建文章
    try {
        const create_date = new Date()
        const update_date = new Date()
        const title = req.body.title
        const tags = req.body.tags
        const content = req.body.content
        const create_user = req.session.user.username
        const status = req.body.status
        const secret = req.body.secret
        const tags = req.body.tags
        let page = {
            title,
            tags,
            content,
            create_user,
            create_date,
            update_date,
            status,
            secret,
            tags
        }
        let result = await PageModel.create(page)
        const [page_num, draft_num] = await Promise.all([
			PageModel.getPageNum('normal', create_user),
			PageModel.getPageNum('draft', create_user)
		])
        res.status(200).json({ code: 'OK', data: { page_num: page_num, draft_num: draft_num } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
    
})
router.post('/edit', checkLogin, async (req, res, next) => { // 编辑文章
    try {
        const id = req.body.id
        const update_date = new Date()
        const title = req.body.title
        const tags = req.body.tags
        const content = req.body.content
        const create_user = req.session.user.username
        const status = req.body.status
        const secret = req.body.secret
        let page = {
            title,
            tags,
            content,
            update_date,
            status,
            secret
        }
        let result = await PageModel.update(id, page)
        const [page_num, draft_num] = await Promise.all([
			PageModel.getPageNum('normal', create_user),
			PageModel.getPageNum('draft', create_user)
		])
        res.status(200).json({ code: 'OK', data: { page_num: page_num, draft_num: draft_num } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
    
})
router.post('/detail', async (req, res, next) => { // 获取文章详情
    try {
        const id = req.body.id
        let result = await PageModel.getPageById(id)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
/**
 * @params {number} req.body.pageSize-每页大小
 * @params {number} req.body.page-页码
 * @params {number} req.body.type
 * @params {number} req.body.content
 * @params {number} req.body.status
 * @params {number} req.body.secret
*/
router.post('/pagelist', async (req, res, next) => { // 获取文章列表
    let pageSize =  req.body.pageSize || 10
    let page = req.body.page || 1
    const type = req.body.type
    const content = req.body.content
    const status = req.body.status
    const secret = req.body.secret
    pageSize = typeof(pageSize) === 'number'?pageSize:parseInt(pageSize)
    page = typeof(page) === 'number'?page:parseInt(page)
    try {

        let [total, result] = await Promise.all([
            PageModel.getPageNum(type, content, status, secret),
            PageModel.getPageList(type, content, status, pageSize, pageSize*(page-1), secret)
        ])
        res.status(200).json({ code: 'OK', data: { result, total } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
router.post('/limitpagelist', checkLogin, async (req, res, next) => { // 根据条件获取文章列表
    let pageSize =  req.body.pageSize || 10
    let page = req.body.page || 0
    const type = req.body.type
    const content = req.body.content
    const status = req.body.status
    const secret = req.body.secret
    pageSize = typeof(pageSize) === 'number'?pageSize:parseInt(pageSize)
    page = typeof(page) === 'number'?page:parseInt(page)
    try {

        let [total, result] = await Promise.all([
            PageModel.getPageNum(type, content, status, secret),
            PageModel.getPageList(type, content, status, pageSize, pageSize*(page-1), secret)
        ])
        res.status(200).json({ code: 'OK', data: { result, total } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
module.exports = router