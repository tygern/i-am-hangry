Hangry.Choice = function Choice(name, tagNames) {
    var hidden = {display: "none"};
    var that = this;

    this.name = name;
    this.tagNames = tagNames;
    this.score = 0;
    this.style = hidden;

    this.setStyle = function setScore(count) {
        if (this.score == 0) {
            this.style = hidden;
        } else {
            var opacity = Math.pow(this.score / count, 2);
            this.style = { opacity: opacity };
        }
    };

    this.setScoreFor = function setScoreFor(tags) {
        var score = 0;
        $.each(tags, function (i, tag) {
            if (tag.isSelectedIn(that.tagNames)) {
                score += 1;
            }
        });
        this.score = score;
    };
};