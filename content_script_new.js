function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}


function checkAcademicWord(word) {
    academicWords = ["homework", "homeworks", "assignment", "assignments", "exam", "exams", "test", "tests", "quiz", "quizzes", "lab", "labs", "project", "projects", "essay", "essays", "lab report", "lab reports", "presentation", "presentations", "class", "classes"];    

    for(i = 0; i<academicWords.length; i++)
    {
        if(word.toLowerCase() == academicWords[i])
            return true;
    }
    return false;
}

function needReplacement(s)
{
    console.log("in needReplacement");

    sArray = s.split();
    console.log(sArray);
    badLanguage = -1;
    academicLanguage = -1;
    for(i = 0; i<=sArray.length; i++)
    {
        if(sArray[i].toLowerCase() == "raped" || sArray[i].toLowerCase() == "fucked")
        {
            console.log("bad language");
            if(academicLanguage >= 0)
            {
                if(i-academicLanguage < 6)
                {
                    console.log("TRUE");
                    return true;
                }
            }
            badLanguage = i;
        }
        else 
        {
            if(checkAcademicWord(sArray[i]))
            {
                console.log("academic word");
                if(badLanguage >= 0)
                {
                    if(i - badLanguage < 6)
                    {
                        console.log("TRUE");
                        return true;
                    }
                }
                academicLanguage = i;
            }
        }
    }
    return false;
}


function replaceText(v)
{

    var searchMask1 = "raped";
    var searchMask2 = "fucked";
    var regEx1 = new RegExp(searchMask1, "ig");
    var regEx2 = new RegExp(searchMask2, "ig");
    var replaceMask = "WRECKED"

    if(needReplacement(v))
    {
        console.log("needReplacement true, replacing based upon that");
        v = v.replace(/\b(R|r)aped\b/g, "wrecked");
        v = v.replace(/\b(F|f)ucked\b/g, "wrecked");
        //v = v.replace(/\bRAPED\b/g, "WRECKED");
        //v = v.replace(/\bFUCKED\b/g, "WRECKED");
        v = v.replace(regEx1, replaceMask);
        v = v.replace(regEx2, replaceMask);
    }

    console.log("back up replaces here");

    v = v.replace(/\b(R|r)aped\b/g, "wrecked");
        v = v.replace(/\b(F|f)ucked\b/g, "wrecked");
        // v = v.replace(/\bRAPED\b/g, "WRECKED");
        // v = v.replace(/\bFUCKED\b/g, "WRECKED");
;
        v = v.replace(regEx1, replaceMask);
        v = v.replace(regEx2, replaceMask);

    return v;


        //NOTES
    //covers most sentence structures like "I got/was _____ed by _______" or "______ ______ed me"
    //allows for up to 4 words between the academic word and "raped" or "fucked"
    //unfortunately, this means it may replace a serious use of rape if it's near an academic word -- e.g. We were studying for the exam, and then he raped me
    //doesn't work on 

}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
