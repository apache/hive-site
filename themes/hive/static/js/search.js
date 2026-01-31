var summaryInclude = 180;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    threshold: 0.2,  // Stricter matching - lower value = more exact matches required
    location: 0,
    distance: 1000,  // Increased from 100 to search entire content
    minMatchCharLength: 1,
    ignoreLocation: true,  // Search entire string, not just near location
    isCaseSensitive: false,  // Case-insensitive search
    findAllMatches: true,  // Find all matching items
    keys: [
        {name: "title", weight: 0.45},
        {name: "contents", weight: 0.4},
        {name: "tags", weight: 0.1},
        {name: "categories", weight: 0.05}
    ]
};

// =============================
// Search
// =============================

var inputBox = document.getElementById('search-query');
if (inputBox !== null) {
    var searchQuery = param("q");
    if (searchQuery) {
        inputBox.value = searchQuery || "";
        executeSearch(searchQuery, false);
    } else {
        document.getElementById('search-results').innerHTML = '<p class="search-results-empty">Please enter a word or phrase above, or see <a href="/tags/">all tags</a>.</p>';
    }
}

function executeSearch(searchQuery) {

    show(document.querySelector('.search-loading'));

    fetch('/index.json').then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        // Examine the text in the response
        response.json().then(function (pages) {
            var fuse = new Fuse(pages, fuseOptions);
            var result = fuse.search(searchQuery);
            if (result.length > 0) {
                populateResults(result);
            } else {
                document.getElementById('search-results').innerHTML = '<p class=\"search-results-empty\">No matches found</p>';
            }
            hide(document.querySelector('.search-loading'));
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    });
}

function populateResults(results) {

    var searchQuery = document.getElementById("search-query").value;
    var searchResults = document.getElementById("search-results");

    // pull template from hugo template definition
    var templateDefinition = document.getElementById("search-result-template").innerHTML;

    results.forEach(function (value, key) {

        var contents = value.item.contents;
        var snippet = "";
        var snippetHighlights = [];

        // Add both the full query and individual terms for highlighting
        snippetHighlights.push(searchQuery);
        
        // Find the best matching snippet - search for where query terms actually appear
        var matchIndex = -1;
        var bestSnippet = "";
        
        // Split search query into words and find where they appear together
        var searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(function(term) { 
            return term.length > 2; // Ignore short words
        });
        
        // Add individual terms to highlights
        searchTerms.forEach(function(term) {
            snippetHighlights.push(term);
        });
        
        if (searchTerms.length > 0) {
            var contentsLower = contents.toLowerCase();
            var bestScore = -1;
            var bestPosition = -1;
            
            // Find the position where search terms are closest together
            for (var i = 0; i < contents.length - 100; i += 50) {
                var windowEnd = Math.min(i + 400, contents.length);
                var window = contentsLower.substring(i, windowEnd);
                var score = 0;
                var foundTerms = 0;
                
                searchTerms.forEach(function(term) {
                    var termIndex = window.indexOf(term);
                    if (termIndex >= 0) {
                        foundTerms++;
                        // Prefer matches closer to the start of the window
                        score += (200 - termIndex);
                    }
                });
                
                // Boost score if multiple terms found in this window
                score *= foundTerms;
                
                if (score > bestScore && foundTerms > 0) {
                    bestScore = score;
                    bestPosition = i;
                }
            }
            
            if (bestPosition >= 0) {
                matchIndex = bestPosition;
                
                // Extract snippet centered on this position
                var start = Math.max(0, matchIndex - summaryInclude / 2);
                var end = Math.min(contents.length, matchIndex + summaryInclude * 1.5);
                
                // Try to find sentence boundaries
                var sentenceStart = contents.lastIndexOf('. ', matchIndex);
                if (sentenceStart > start && sentenceStart < matchIndex && (matchIndex - sentenceStart) < 100) {
                    start = sentenceStart + 2;
                }
                
                var sentenceEnd = contents.indexOf('. ', end - 50);
                if (sentenceEnd > matchIndex && sentenceEnd <= end && (sentenceEnd - matchIndex) < 200) {
                    end = sentenceEnd + 1;
                }
                
                bestSnippet = contents.substring(start, end).trim();
                
                // Add ellipsis
                var needsStartEllipsis = start > 0;
                var needsEndEllipsis = end < contents.length;
                snippet = (needsStartEllipsis ? '&hellip; ' : '') + 
                         bestSnippet + 
                         (needsEndEllipsis ? ' &hellip;' : '');
            }
        }
        
        // Fallback if no match found
        if (!snippet) {
            snippet = contents.substring(0, summaryInclude * 2).trim() + '&hellip;';
        }

        //replace values
        var output = render(templateDefinition, {
            key: key,
            title: value.item.title,
            link: value.item.permalink,
            snippet: snippet
        });
        searchResults.innerHTML += output;

        snippetHighlights.forEach(function (snipvalue, snipkey) {
            var instance = new Mark(document.getElementById('summary-' + key));
            instance.mark(snipvalue);
        });

    });
}

function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
    //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
        if (data[conditionalMatches[1]]) {
            //valid key, remove conditionals, leave contents.
            copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
        } else {
            //not valid, remove entire section
            copy = copy.replace(conditionalMatches[0], '');
        }
    }
    templateString = copy;
    //now any conditionals removed we can do simple substitution
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    return templateString;
}

// Helper Functions
function show(elem) {
    elem.style.display = 'block';
}
function hide(elem) {
    elem.style.display = 'none';
}
function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}
