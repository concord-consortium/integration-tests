const laraSequenceElements = {
    // LNK_HEADER_SEQUENCE_NAME: 'div.sequence_logo_block h2 a.sequence_title',
    LNK_HEADER_SEQUENCE_NAME: '.sequence-title h2',
    LNK_USERNAME: 'div.profile-u-name a.popup-trigger',
    LNK_NOT_YOU: 'div.known_user.popup-prompt span a',
    NAV_ESTIMATED_TIME: 'div.estimated-time',
    // LBL_ESTIMATED_TIME_IN_MINUTES: 'div.estimated-time span.time_to_complete span.minutes_to_complete',
    LBL_ESTIMATED_TIME_IN_MINUTES: '.estimated-time .time',
    QUESTION_SECTION_BASE: 'div.content-mod div.interactive-mod',

}
export default laraSequenceElements;

// export function getActivityLinkInSequenceSelector(activityIndex){
//     return 'div.activities div.activity-bg:nth-child(' + activityIndex + ') div.activity span.title a';
// }

export function getActivityLinkInSequenceSelector() {
    return '.sequence-content .thumb-holder .thumb .name';
}

export function getActivityCompleteBannerSelector(activityIndex){
    return 'div.activities div.activity-bg:nth-child(' + activityIndex + ') div.ribbon_wrap div.banner div.text';
}

export function getQuestionSectionSelector(questionNumberInPage){
    return laraSequenceElements.QUESTION_SECTION_BASE + ' div.embeddable-root:nth-child(' + questionNumberInPage + ')';
}

export function getIFrameSelectorForQuestion(questionNumberInPage){
    return cy.get("[data-cy=managed-interactive] .has-question-number").eq(questionNumberInPage - 1).find('iframe');
}
