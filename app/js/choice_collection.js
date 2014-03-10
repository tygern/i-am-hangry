Hangry.ChoiceCollection = function ChoiceCollection(choices) {
    this.choices = $.map(choices, function (choice) {
        return new Hangry.Choice(choice.name, choice.tags);
    });

    this.updateScores = function updateScores(tags) {
        $.each(this.choices, function (i, choice) {
            choice.setScoreFor(tags);
        });
    };

    this.setStyles = function setStyles(count) {
        $.each(this.choices, function (i, choice) {
            choice.setStyle(count);
        });
    };
};