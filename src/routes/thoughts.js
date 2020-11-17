const express = require('express');
const router = express.Router();
const { ensureAuth} = require('../Middleware/auth')
const ThoughtsController = require('../controllers/thoughts');

/**
 * @route GET /thoughts/add
 */
router.get('/add', ensureAuth, ThoughtsController.renderAddPage);

/**
 * @route POST/thoughts
 */
router.post('/', ensureAuth, ThoughtsController.createEntry);

/**
 * @route GET /thoughts
 */
router.get('/', ensureAuth, ThoughtsController.renderPublicEntries);

/**
 * @route GET /thoughts/:id
 */
router.get('/:id', ensureAuth, ThoughtsController.renderSingleEntry);

/**
 * @route GET /thoughts/edit/:id
 */
router.get('/edit/:id', ensureAuth, ThoughtsController.renderEditPage);

/**
 * @route PUT /thoughts/:id
 */
router.put('/:id', ensureAuth, ThoughtsController.updateEntry);

/**
 * @route DELETE /thoughts/:id
 */
router.delete('/:id', ensureAuth, ThoughtsController.deleteEntry);

/**
 * @route GET /thoughts/user/:userId
 */
router.get('/user/:userId', ensureAuth, ThoughtsController.renderUserEntries);

module.exports = router;
