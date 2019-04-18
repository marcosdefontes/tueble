function highlightText (words, query) {
    if (!query) {
        return words;
    }
    // var iQuery = new RegExp(query, "ig");
    return words.toString()
        .replace(new RegExp(query, "gi"), match => {
            return '<span class="highlight">' + match + '</span>';
        });
};

export default highlightText;