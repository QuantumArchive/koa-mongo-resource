const router = require('koa-router')();
const AnimeShow = require('../models/animeshow');
const AnimeChar = require('../models/animechar');
const bodyParser = require('body-parser').json();

router
    .get('/animeshows', function *(next) {
        this.body = yield AnimeShow.find({})
                        .lean()
                        .then(animeshows => {
                            return animeshows;
                        })
                        .catch(err => {
                            return err;
                        });
    })
    .get('/animeshows/:id', function *(next) {
        this.body = yield AnimeShow.findById(this.params.id)
                        .lean()
                        .then(animeshow => {
                            return animeshow;
                        })
                        .catch(err => {
                            return err;
                        });
    })
    .del('/animeshows/:id', function *(next) {
        this.body = yield AnimeShow.findByIdAndremove(this.params.id)
                        .lean()
                        .then(animeshow => {
                            return animeshow;
                        })
                        .catch(err => {
                            return err;
                        });
    })
    .put()
    .post()

module.exports = router;