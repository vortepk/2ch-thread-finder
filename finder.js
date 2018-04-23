var casper = require('casper').create();
var fs = require('fs');
var json;
var int;
var search = "WEBM MP4";

casper.start().then(function() {
    this.open('https://2ch.hk/b/threads.json');
});

casper.then(function() {
    json = JSON.parse(this.getPageContent());
    for(var i = 0; i < json.threads.length; i++) {
        if(json.threads[i].subject.indexOf(search) + 1) {
            int = json.threads[i].num;
        }
    }
    if(int) {
        this.open('https://2ch.hk/b/res/'+ int +'.html');
        this.echo('Thread is opened.');

        casper.then(function() {
            this.echo('url: ' + this.getCurrentUrl());
            fs.write('link.txt', this.getCurrentUrl(), 'w');
         });
    }
    else {
        this.echo('Thread is not found.');
    }
});


casper.run(function() {
    this.echo('Script finished.');
    this.exit();
});