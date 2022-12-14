export const BTN_HOME_PAGE = 'div.pages div.pagination div.pagination-item:nth-child(1) a.pagination-link';

// export function BTN_ACTIVITY_PAGE(pageNumber){
//     return 'div.pages div.pagination div.pagination-item:nth-child(' + ( pageNumber + 1 ) + ') a.pagination-link';
// }

export function BTN_ACTIVITY_PAGE(){
    return '[data-cy = nav-pages-button]';
}
