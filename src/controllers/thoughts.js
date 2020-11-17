const Entry = require('../models/Entry');

/**
 * @description Renders our add page to create entries
 */
exports.renderAddPage = (req, res) => {
  res.render('thoughts/add');
};

/**
 * @description Creates an entry object in the data pase with POST data
 */
exports.createEntry = (req, res) => {
  req.body.user = req.user.id;
  Entry.create(req.body)
    .then(() => res.redirect('/dashboard'))
    .catch((err) => {
      console.error(err);
      res.render('error/500');
    });
};

/**
 * @description Renders the index page to show public entries of every user
 */
exports.renderPublicEntries = (req, res) => {
  Entry.find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc' })
    .lean()
    .exec()
    .then((entries) => {
      res.render('thoughts/index', {
        entries,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('error/500');
    });
};

/**
 * @description Renders the show page to display the entry of a single user
 */
exports.renderSingleEntry = (req, res) => {
  Entry.findById(req.params.id)
    .populate('user')
    .lean()
    .exec()
    .then((entry) => {
      if (!entry) {
        return res.render('error/404');
      }
      res.render('thoughts/show', {
        entry,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('error/404');
    });
};

/**
 * @description Renders the edit page
 */
exports.renderEditPage = (req, res) => {
  Entry.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .then((entry) => {
      if (!entry) {
        return res.render('error/404');
      }
      if (entry.user != req.user.id) {
        res.redirect('/thoughts');
      } else {
        res.render('thoughts/edit', {
          entry,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.render('error/500');
    });
};

/**
 * @description Updates an existing entry
 */
exports.updateEntry = (req, res) => {
  Entry.findById(req.params.id)
    .lean()
    .exec()
    .then((entry) => {
      if (!entry) {
        return res.render('error/404');
      }
      if (entry.user != req.user.id) {
        res.redirect('/thoughts');
      } else {
        Entry.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        }).exec();
        res.redirect('/dashboard');
      }
    })
    .catch((err) => {
      console.error(err);
      res.render('error/500');
    });
};

/**
 * @description Delete an entry
 */
exports.deleteEntry = (req, res) => {
  Entry.findById(req.params.id)
    .lean()
    .exec()
    .then((entry) => {
      if (!entry) {
        return res.render('error/404');
      }
      if (entry.user != req.user.id) {
        res.redirect('/thoughts');
      } else {
        Entry.deleteOne({ _id: req.params.id }).exec();
        res.redirect('/dashboard');
      }
    })
    .catch((err) => {
      console.error(err);
      res.render('error/500');
    });
};

/**
 * @description Render a single user's public entries on the index page
 */
exports.renderUserEntries = (req, res) => {
  Entry.find({
    user: req.params.userId,
    status: 'public',
  })
    .populate('user')
    .lean()
    .exec()
    .then((entries) => {
      res.render('thoughts/index', {
        entries,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('error/500');
    });
};
