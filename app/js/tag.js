Hangry.Tag = function Tag(name) {
    this.name = name;
    this.selected = false;
    this.match = false;

    this.isMatch = function (query) {
        return this.name.match(new RegExp(query, "ig"));
    };

    this.isSelectedIn = function isSelectedIn(tagNames) {
        return (this.selected && ($.inArray(this.name, tagNames) != -1));
    };
};