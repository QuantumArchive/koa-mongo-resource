const router = require('koa-router')();
const AnimeShow = require('../models/animeshow');
const AnimeChar = require('../models/animechar');
const bodyParser = require('body-parser').json();

router
    .get('/animechars', function *(next) {
        this.body = yield AnimeChar.find({})
                    .lean()
                    .then(animechars => {
                        return animechars;
                    })
                    .catch(err => {
                        return err;
                    });
    })
    .get('/animechars/:id', function *(next) {
        this.body = yield AnimeChar.findById(this.params.id)
                    .lean()
                    .then(animechar => {
                        return animechar;
                    })
                    .catch(err => {
                        return err;
                    });
    })
    .del('/animechars/:id', function *(next) {
        this.body = yield AnimeChar.findByIdAndRemove(this.params.id)
                    .lean()
                    .then(animechar => {
                        return animechar;
                    })
                    .catch(err => {
                        return err;
                    });
    })
    .put('/animechars/:id', function *(next) {
        const newData = JSON.parse(this.request.header.content);
        this.body = yield AnimeChar.findByIdAndUpdate(this.params.id, newData, {new: true})
                    .then(update => {
                        return update;
                    })
                    .catch(err => {
                        return err;
                    });
    })
    .post('/animechars', function *(next) {
        const newChar = JSON.parse(this.request.header.content);
        this.body = yield new AnimeChar(newChar).save()
                    .then(char => {
                        return char;
                    })
                    .catch(err => {
                        return err;
                    });
    });

module.exports = router;