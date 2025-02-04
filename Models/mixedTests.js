const { getTests } = require("../data/data");

async function getMixedTests(testCount) {
    const tests = [];
    const usedIds = new Set();

    while (tests.length < testCount) {
        const randomIndex = Math.floor(Math.random() * getTests.length);
        const randomTest = getTests[randomIndex];

        if (!usedIds.has(randomTest.id)) {
            tests.push(randomTest);
            usedIds.add(randomTest.id);
        }
    }

    return { tests }; // JSON formatda qaytarish
}

module.exports = { getMixedTests };
