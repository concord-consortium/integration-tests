export const laraActivityRuntimeElement = {

}

export default laraActivityRuntimeElement;

export function getOpenQuestionResponseSelector(questionNumberInPage){
    return 'div.questions-mod div.question:nth-child('+questionNumberInPage+') #embeddable_open_response_answer_answer_text';
}