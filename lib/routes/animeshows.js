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
        this.body = yield AnimeShow.findByIdAndRemove(this.params.id)
                        .lean()
                        .then(animeshow => {
                            return animeshow;
                        })
                        .catch(err => {
                            return err;
                        });
    })
    .put('/animeshows/:id', function *(next) {
        const newData = JSON.parse(this.request.header.content);
        this.body = yield AnimeShow.findByIdAndUpdate(this.params.id, newData, {new: true})
                        .then(update => {
                            return update;
                        })
                        .catch(err => {
                            return err;
                        });
    })
    .post('/animeshows', function *(next) {
        const newShow = JSON.parse(this.request.header.content);
        this.body = yield new AnimeShow(newShow).save()
                        .then(char => {
                            return char;
                        })
                        .catch(err => {
                            return err;
                        });
    });

module.exports = router;