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
    sArray = s.split();
    badLanguage = -1;
    academicLanguage = -1;
    for(i = 0; i<=sArray.length; i++)
    {
        if(sArray[i].toLowerCase() == "raped" || sArray[i].toLowerCase() == "fucked")
        {
            if(academicLanguage >= 0)
            {
                if(i-academicLanguage < 6)
                {
                    return true;
                }
            }
            badLanguage = i;
        }
        else 
        {
            if(checkAcademicWord(sArray[i]))
            {
                if(badLanguage >= 0)
                {
                    if(i - badLanguage < 6)
                    {
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

    if(needReplacement(v))
    {
        v = v.replace(/\b(R|r)aped\b/g, "wrecked");
        v = v.replace(/\b(F|f)ucked\b/g, "wrecked");
        // var searchMask1 = "raped";
        // var searchMask2 = "fucked";
        // var regEx1 = new RegExp(searchMask1, "ig");
        // var regEx2 = new RegExp(searchMask2, "ig");
        // var replaceMask = "WRECKED";
        // v = v.replace(regEx1, replaceMask1);
        // v = v.replace(regEx2, replaceMask2);


        v = v.replace(/\bRAPED\b/g, "WRECKED");
        v = v.replace(/\bFUCKED\b/g, "WRECKED");

    }
    return v;


    //NOTES
    //covers most sentence structures like "I got/was _____ed by _______" or "______ ______ed me"
    //allows for up to 4 words between the academic word and "raped" or "fucked"
    //unfortunately, this means it may replace a serious use of rape if it's near an academic word -- e.g. We were studying for the exam, and then he raped me
    //doesn't work on 



        //     v = v.replace(/\b(R|r)aped\b/g, "wrecked");
        // v = v.replace(/\b(F|f)ucked\b/g, "wrecked");
        // v = v.replace(/\bRAPED\b/g, "WRECKED");
        // v = v.replace(/\bFUCKED\b/g, "WRECKED");


    // v = v.replace(/\b(H|h)omework(s)? raped\b/g, "$1omework$2 wrecked");
    // v = v.replace(/\b(H|h)(W|w) raped\b/g, "$1$2 wrecked");
    // v = v.replace(/\b(A|a)ssignment(s)? raped\b/g, "$1ssignment$2 wrecked");
    // v = v.replace(/\b(E|e)xam(s)? raped\b/g, "$1xam$2 wrecked");
    // v = v.replace(/\b(T|t)est(s)? raped\b/g, "$1est$2 wrecked");
    // v = v.replace(/\b(Q|q)uiz raped\b/g, "$1uiz wrecked");
    // v = v.replace(/\b(Q|q)uizzes raped\b/g, "$1uizzes wrecked");
    // v = v.replace(/\b(L|l)ab(s)? raped\b/g, "$1ab$2 wrecked");
    // v = v.replace(/\b(L|l)ab report(s)? raped\b/g, "$1ab report$2 wrecked");
    // v = v.replace(/\b(P|p)roject(s)? raped\b/g, "$1roject$2 wrecked");
    // v = v.replace(/\b(E|e)ssay(s)? raped\b/g, "$1ssay$2 wrecked");
    // v = v.replace(/\b(C|c)lass raped\b/g, "$1lass wrecked");
    // v = v.replace(/\b(C|c)lasses raped\b/g, "$1lasses wrecked");
    // v = v.replace(/\b(P|p)resentation(s)? raped\b/g, "$1resentation$2 wrecked");

    // v = v.replace(/\b(H|h)omework(s)? fucked\b/g, "$1omework$2 wrecked");
    // v = v.replace(/\b(H|h)(W|w) fucked\b/g, "$1$2 wrecked");
    // v = v.replace(/\b(A|a)ssignment(s)? fucked\b/g, "$1ssignment$2 wrecked");
    // v = v.replace(/\b(E|e)xam(s)? fucked\b/g, "$1xam$2 wrecked");
    // v = v.replace(/\b(T|t)est(s)? fucked\b/g, "$1est$2 wrecked");
    // v = v.replace(/\b(Q|q)uiz fucked\b/g, "$1uiz wrecked");
    // v = v.replace(/\b(Q|q)uizzes fucked\b/g, "$1uizzes wrecked");
    // v = v.replace(/\b(L|l)ab(s)? fucked\b/g, "$1ab$2 wrecked");
    // v = v.replace(/\b(L|l)ab report(s)? fucked\b/g, "$1ab report$2 wrecked");
    // v = v.replace(/\b(P|p)roject(s)? fucked\b/g, "$1roject$2 wrecked");
    // v = v.replace(/\b(E|e)ssay(s)? fucked\b/g, "$1ssay$2 wrecked");
    // v = v.replace(/\b(C|c)lass fucked\b/g, "$1lass wrecked");
    // v = v.replace(/\b(C|c)lasses fucked\b/g, "$1lasses wrecked");
    // v = v.replace(/\b(P|p)resentation(s)? fucked\b/g, "$1resentation$2 wrecked");


    // v = v.replace(/\bgot raped by ***** (T|t)est(s)? raped\b/g, "$1est$2 wrecked");
    // v = v.replace(/\b(H|h)omework(s)? raped\b/g, "$1omework$2 wrecked");
    // v = v.replace(/\b(A|a)ssignment(s)? raped\b/g, "$1ssignment$2 wrecked");
    // v = v.replace(/\b(E|e)xam(s)? raped\b/g, "$1xam$2 wrecked");
    // v = v.replace(/\b(T|t)est(s)? raped\b/g, "$1est$2 wrecked");
    // v = v.replace(/\b(Q|q)uiz raped\b/g, "$1uiz wrecked");
    // v = v.replace(/\b(Q|q)uizzes raped\b/g, "$1uizzes wrecked");
    // v = v.replace(/\b(L|l)ab(s)? raped\b/g, "$1ab$2 wrecked");
    // v = v.replace(/\b(L|l)ab report(s)? raped\b/g, "$1ab report$2 wrecked");
    // v = v.replace(/\b(P|p)roject(s)? raped\b/g, "$1roject$2 wrecked");
    // v = v.replace(/\b(E|e)ssay(s)? raped\b/g, "$1ssay$2 wrecked");
    // v = v.replace(/\b(C|c)lass raped\b/g, "$1lass wrecked");
    // v = v.replace(/\b(C|c)lasses raped\b/g, "$1lasses wrecked");
    // v = v.replace(/\b(P|p)resentation(s)? raped\b/g, "$1resentation$2 wrecked");

    //essay
    //class
    //presentation

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
