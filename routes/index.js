var express = require('express');
var UserHandler = require('../handlers/users');
var _ = require('lodash');

module.exports = function (app, db) {
    "use strict";
    
    var userRouter = require('./users')(db);
    var productRouter = require('./products')(db);
    
    var userHandler = new UserHandler(db);
    
    function checkSession(req, res, next) {
        if (req.session.uId){
            return next();
        }
        res.render('login');
    }

    app.get('/graph', function(req, res, next){
       const result = {
           nodes: [
               {id: 0, name: 'Peter', url: 'http://digmast.ru/images/lessons/photo_for_documents/preview.jpg'},
               {id: 1, name: 'Paul', url: 'https://dreamitcodeitwinit.files.wordpress.com/2014/01/290053v2-max-250x250.jpg?w=1000'},
               {id: 2, name: 'Florian', url: 'http://gazeta.lviv.ua/wp-content/uploads/2016/06/12910642_584264068395305_278364554_n-250x250-1-1-1-1-2.jpg'},
               {id: 3, name: 'Thomas', url: 'http://golbis.com/wp-content/uploads/2016/09/1473427482k84ng-250x250.jpg'},
               {id: 4, name: 'Anna', url: 'https://active-camp.ru/wp-content/uploads/2015/10/avatar-250x250.jpg'},
               {id: 5, name: 'Julia', url: 'http://devushka.ru/upload/pagestyle/55_avatar_Ruslana%20%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80.jpg'},
               {id: 6, name: 'Katrin', url: 'http://rosstur44.ru/design/mt/images/bg-face-no-man.jpg'},
               {id: 7, name: 'Katharina', url: 'http://rosstur44.ru/design/mt/images/bg-face-no-man.jpg'},
               {id: 8, name: 'Silvia', url: 'http://rosstur44.ru/design/mt/images/bg-face-no-man.jpg'},
               {id: 9, name: 'Jenny', url: 'https://active-camp.ru/wp-content/uploads/2015/04/Avatar1-250x250.jpg'},
               {id: 10, name: 'Antony', url: 'http://rosstur44.ru/design/mt/images/bg-face-no-man.jpg'}
           ],
           links: [
               {nodes: [0, 1], kind: 'friendship'},
               {nodes: [0, 2], kind: 'friendship'},
               {nodes: [0, 3], kind: 'family'},
               {nodes: [0, 6], kind: 'family'},
               {nodes: [0, 8], kind: 'friendship'},
               {nodes: [1, 8], kind: 'friendship'},
               {nodes: [1, 4], kind: 'friendship'},
               {nodes: [1, 6], kind: 'friendship'},
               {nodes: [2, 6], kind: 'colleague'},
               {nodes: [2, 9], kind: 'colleague'},
               {nodes: [3, 8], kind: 'colleague'},
               {nodes: [3, 9], kind: 'colleague'},
               {nodes: [4, 5], kind: 'colleague'},
               {nodes: [4, 8], kind: 'friendship'},
               {nodes: [5, 6], kind: 'friendship'},
               {nodes: [6, 10], kind: 'friendship'},
           ]
       };
       
       res.status(200).send(result);
    });
    app.post('/login', userHandler.letsLogin);
    app.post('/registration', userHandler.letsRegister);
    app.post('/logout', userHandler.letsLogout);
    
    app.use('/users', userRouter);
    app.use('/products', productRouter);
};