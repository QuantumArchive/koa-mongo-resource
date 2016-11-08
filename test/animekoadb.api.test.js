const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe('tests the animechara and animeshows api using a koa framework', () => {
    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const animeshow = 'animeshows';
            const animechar = 'animechars';
            connection.db
                    .listCollections({name: [animeshow, animechar]})
                    .next((err, callinfo) => {
                        if (!callinfo) return done();
                        connection.db.dropCollection([animeshow, animechar], done);
                    });
        };
    });

    const request = chai.request(app.callback());
    const keiichi = {
        name: 'Keiichi Maebara',
        age: 16,
        power: 'Breaking Fate',
        attackpower: 8,
        hair_color: 'brown',
    };
    const higurashi = {
        showname: 'Higurashi no Naku Koro Ni',
        airdate: '2006-04-04',
        genre: 'mystery horror',
    };
    let show_id = '';

    it('makes a /GET request on all anime chars', done => {
        request
            .get('/animechars')
            .then(res => {
                assert.isOk(res.body);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('makes a /POST request to anime chars using Keiichi', done => {
        request
            .post('/animechars')
            .set('content', JSON.stringify(keiichi))
            .then(res => {
                const character = res.body;
                assert.isOk(character._id);
                keiichi._id = character._id;
                keiichi.__v = 0;
                assert.deepEqual(character, keiichi);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('makes a /GET request for Keiichi', done => {
        request
            .get('/animechars/' + keiichi._id)
            .then(res => {
                assert.deepEqual(res.body, keiichi);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('makes a /POST request to anime shows using Higurashi', done => {
        request
            .post('/animeshows')
            .set('content', JSON.stringify(higurashi))
            .then(res => {
                const show = res.body;
                assert.isOk(show._id);
                higurashi._id = show._id;
                higurashi.__v = 0;
                higurashi.airdate = show.airdate;
                assert.deepEqual(show, higurashi);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('makes a /PUT request to update the show', done => {
        request
            .put('/animeshows/' + higurashi._id)
            .set('content', JSON.stringify({genre: 'mystery horror comedy'}))
            .then(res => {
                higurashi.genre = 'mystery horror comedy';
                assert.deepEqual(res.body, higurashi);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('makes a /DEL request to remove Keiichi', done => {
        request
            .del('/animechars/' + keiichi._id)
            .then(res => {
                assert.deepEqual(res.body, keiichi);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('makes a /DEL request to remove Higurashi', done => {
        request
            .del('/animeshows/' + higurashi._id)
            .then(res => {
                assert.deepEqual(res.body, higurashi);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
});