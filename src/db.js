const { v4: uuidv4 } = require('uuid');

const db = {
  users: {},
  books: [
    { isbn: "9781449325862", title: "Git Pocket Guide", subTitle: "A Working Introduction", author: "Richard E. Silverman", publish_date: "2013-08-02", publisher: "O'Reilly Media", pages: 234, description: "This pocket guide is the perfect on-the-job companion to Git.", website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html" },
    { isbn: "9781449331818", title: "Learning JavaScript Design Patterns", subTitle: "A JavaScript and jQuery Developer's Guide", author: "Addy Osmani", publish_date: "2012-07-01", publisher: "O'Reilly Media", pages: 254, description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript.", website: "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/" },
    { isbn: "9781449337711", title: "Designing Evolvable Web APIs with ASP.NET", subTitle: "Harnessing the Power of the Web", author: "Glenn Block et al.", publish_date: "2014-04-07", publisher: "O'Reilly Media", pages: 538, description: "Design and build Web APIs for a broad range of clients.", website: "http://chimera.labs.oreilly.com/books/1234000001708/index.html" },
    { isbn: "9781449365035", title: "Speaking JavaScript", subTitle: "An In-Depth Guide for Programmers", author: "Axel Rauschmayer", publish_date: "2014-02-01", publisher: "O'Reilly Media", pages: 460, description: "Like it or not, JavaScript is everywhere these days.", website: "http://speakingjs.com/" },
    { isbn: "9781491904244", title: "You Don't Know JS", subTitle: "Up & Going", author: "Kyle Simpson", publish_date: "2015-03-27", publisher: "O'Reilly Media", pages: 98, description: "It's easy to learn parts of JavaScript, but much harder to learn it completely.", website: "https://github.com/getify/You-Dont-Know-JS" },
    { isbn: "9781491950296", title: "Programming JavaScript Applications", subTitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries", author: "Eric Elliott", publish_date: "2014-07-01", publisher: "O'Reilly Media", pages: 254, description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications.", website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html" },
    { isbn: "9781593275846", title: "Eloquent JavaScript, Second Edition", subTitle: "A Modern Introduction to Programming", author: "Marijn Haverbeke", publish_date: "2014-12-14", publisher: "No Starch Press", pages: 472, description: "JavaScript lies at the heart of almost every modern web application.", website: "http://eloquentjavascript.net/" },
    { isbn: "9781593277574", title: "Understanding ECMAScript 6", subTitle: "The Definitive Guide for JavaScript Developers", author: "Nicholas C. Zakas", publish_date: "2016-09-03", publisher: "No Starch Press", pages: 352, description: "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language.", website: "https://leanpub.com/understandinges6" }
  ]
};

module.exports = { db, uuidv4 };
