import {grade5Tests} from "../data/data";

export const getTests = async (questionId, questionCount, userId) => {
    const answer = [];
    while (answer.length < questionCount) {
        const randomIndex = Math.floor(Math.random() * grade5Tests.length);
        const test = grade5Tests[randomIndex];
        if (!answer.some(a => a.id === test.id) && test.id !== questionId && test.id !== userId) {
            answer.push(test);
        }
    }
    return answer;
}
