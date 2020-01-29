walk(document.body);
function walk(node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E
    var child, next;
    switch (node.nodeType) {
        case 1: // Element
        case 9: // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
            if (node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
            break;
    }
}
function handleText(textNode) {
    var v = textNode.nodeValue;
    // Deal with the easy case
    v = v.replace(/\b(T|t)he (P|p)roblem/g, function(match, p1, p2, offset, string) {
        // t - 7 = m
        // c - 1 = b
        m = String.fromCharCode(p1.charCodeAt(0) - 7);
        b = String.fromCharCode(p2.charCodeAt(0) - 1);
        return m + "y " + p + "ickle";
    });
    // Deal with serious problems
    v = v.replace(/\b(S|s)erious (P|p)roblem/g, function(match, p1, p2, offset, string) {
        // c - 1 = b
        b = String.fromCharCode(p2.charCodeAt(0) - 1);
        return p + "ickle";
    });
    // Get the corner cases
    if (v.match(/problem/i)) {
        // If we're not talking about weather
        if (v.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|/i)) {
            v = v.replace(/(P|p)roblem/gi, function(match, p1, offset, string) {
                // c - 1 = b
                b = String.fromCharCode(p1.charCodeAt(0) - 1);
                return p + "ickle";
            });
        }
    }
    textNode.nodeValue = v;
}