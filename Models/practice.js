import { grade5Tests } from "../data/data";

export const getTests = async (questionId, questionCount, userId, themes) => {
    const answer = [];

    // Filter the tests based on selected themes
    const filteredTests = grade5Tests.filter((test, index) => themes.includes(index + 1)); // index + 1 corresponds to the theme number

    // Create an array of questions from the selected themes
    const filteredQuestions = filteredTests.flatMap(test => test.questions);

    // Randomly select questions until the required count is met
    while (answer.length < questionCount && filteredQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length); // Random index in the filtered questions
        const test = filteredQuestions[randomIndex]; // Random test selection
        
        // Ensure no repetition of question IDs and check that the question doesn't match the excluded questionId or userId
        if (!answer.some(a => a.id === test.id) && test.id !== questionId && test.id !== userId) {
            answer.push(test); // Add unique test to the answer array
        }
    }
    return answer;
};


