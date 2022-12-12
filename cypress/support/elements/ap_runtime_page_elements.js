const activityPlayerRuntimeElements = {
    NAV_PAGINATION_HEADER: 'div.activity-nav[data-cy=\"activity-nav-header\"] div.nav-pages',
    // LNK_PREVIOUS_PAGE: 'div.activity-nav[data-cy=\"activity-header\"]  div.nav-pages button.page-button[aria-label=\"Previous page\"]',
    LNK_PREVIOUS_PAGE: 'div.activity-nav[data-cy=activity-nav-header]  div.nav-pages button.page-button[data-cy=previous-page-button]',
    LNK_HOME_PAGE: 'div.activity-nav[data-cy=\"activity-header\"]  div.nav-pages button.page-button[aria-label=\"Home\"]',
    // LNK_NEXT_PAGE: 'div.activity-nav[data-cy=\"activity-header\"]  div.nav-pages button.page-button[aria-label=\"Next page\"]',
    LNK_NEXT_PAGE: 'div.activity-nav[data-cy=activity-nav-header] div.nav-pages button.page-button[data-cy=next-page-button]',
    TXT_USERNAME: 'div.account-owner-name',
    PAGE_CONTENT_SECTION: 'div.page-content',
    ACTIVITY_TITLE_HOME_PAGE: 'div.intro-content div.introduction div.activity-summary div.activity-title h1',
    ACTIVITY_DESC_HOME_PAGE: 'div.intro-content div.introduction div.activity-summary div.activity-content.intro-text p',
    ACTIVITY_ESTIMATED_LABEL_HOME_PAGE: 'div.intro-content div.introduction div.activity-summary div.estimated-time div.estimate',
    ACTIVITY_ESTIMATED_TIME_HOME_PAGE: 'div.intro-content div.introduction div.activity-summary div.estimated-time div.time',

    ACTIVITY_PAGES_LIST_HOME_PAGE: 'div.intro-content div.introduction div.activity-page-links',
    BTN_BEGIN_ACTIVITY: 'div.intro-content div.introduction div.activity-page-links button.begin',

    // ALL_QUESTIONS_SECTION: 'div.page-content div.embeddables',

    ALL_QUESTIONS_SECTION: 'div.page-content',

    FILL_IN_THE_BLANK_SECTION: 'div.fill-in-the-blank p',

    BTN_SHOW_MY_WORK: 'div.page-content div.bottom-buttons button[data-cy=\"bottom-button-report\"]',
}

export default activityPlayerRuntimeElements;

export function getLinkPageNumberSelector(pageNumber){
    return activityPlayerRuntimeElements.NAV_PAGINATION_HEADER + ' button.page-button:nth-child(' + (pageNumber + 2) + ')';
}

export function getQuestionSectionSelector(questionNumberInPage){
    return activityPlayerRuntimeElements.ALL_QUESTIONS_SECTION + ' div.embeddable:nth-child('+questionNumberInPage+') div.managed-interactive';
}

export function getQuestionHeaderSelector(questionNumberInPage){
    return getQuestionSectionSelector(questionNumberInPage) + ' div.header';
}

export function getQuestionHintLinkSelector(questionNumberInPage){
    return getQuestionHeaderSelector(questionNumberInPage) + ' div.question-container svg';
}

export function getQuestionHintTextSelector(questionNumberInPage){
    return getQuestionSectionSelector(questionNumberInPage) + ' div.hint-container div.hint.question-txt p';
}

export function getNextPageSelector(){
    return activityPlayerRuntimeElements.LNK_NEXT_PAGE;
}

export function getPreviousPageSelector(){
    return activityPlayerRuntimeElements.LNK_PREVIOUS_PAGE;
}

export function getPageName(){
    return activityPlayerRuntimeElements.ALL_QUESTIONS_SECTION + ' div.name';
}
