import {uid} from 'uid';

import * as c from '../support/constants.js'
import * as noticeHelper from '../support/helpers/noticeHelper'

const NOTICE_ONE = 'This is notice one-'+uid();
const NOTICE_ONE_EDITED = NOTICE_ONE + '-Edited';
const NOTICE_TWO = 'This is notice two-'+uid();

context("Verify users can view, collapse and dismiss notices", () => {

    before(function() {
        cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page

    });

    afterEach(function() {
        cy.logout();
    });

    it("Verify Admin can create notices", () => {
        cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);// Login as admin user
        noticeHelper.createNotice(NOTICE_ONE);
        noticeHelper.createNotice(NOTICE_TWO);
    });

    it("Verify Student can not view the notice", () => {
        cy.login(c.STUDENT_USERNAME, c.STUDENT_PASSWORD);
        noticeHelper.noticeTableDoesNotExist();
    });

    it("Verify Teacher can view and dismiss notices", () => {
        cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE);
        noticeHelper.userDismissNotice(NOTICE_ONE);
        noticeHelper.userCannotViewNotice(NOTICE_ONE);
        noticeHelper.userViewNotice(NOTICE_TWO);

        //verify hide and show notices link.
        noticeHelper.userHideNotices();
        noticeHelper.userShowNotices();
    });

    it("Verify Manager can view and dismiss notices", () => {
        cy.login(c.MANAGER_USERNAME, c.MANAGER_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE);
        noticeHelper.userDismissNotice(NOTICE_ONE);
        noticeHelper.userCannotViewNotice(NOTICE_ONE);
        noticeHelper.userViewNotice(NOTICE_TWO);

        //verify hide and show notices link.
        noticeHelper.userHideNotices();
        noticeHelper.userShowNotices();
    });

    it("Verify Author can view and dismiss notices", () => {
        cy.login(c.AUTHOR_USERNAME, c.AUTHOR_PASSWORD);

        noticeHelper.userViewNotice(NOTICE_ONE);
        noticeHelper.userDismissNotice(NOTICE_ONE);
        noticeHelper.userCannotViewNotice(NOTICE_ONE);
        noticeHelper.userViewNotice(NOTICE_TWO);

        //verify hide and show notices link.
        noticeHelper.userHideNotices();
        noticeHelper.userShowNotices();
    });

    it("Verify Researcher can view and dismiss notices", () => {
        cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE);
        noticeHelper.userDismissNotice(NOTICE_ONE);
        noticeHelper.userCannotViewNotice(NOTICE_ONE);
        noticeHelper.userViewNotice(NOTICE_TWO);

        //verify hide and show notices link.
        noticeHelper.userHideNotices();
        noticeHelper.userShowNotices();

    });

    it("Verify Admin can edit notices", () => {
        cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
        noticeHelper.editNotice(NOTICE_ONE, NOTICE_ONE_EDITED);
    });

    it("Verify Teacher can view dismissed notice after Admin edits it", () => {
        cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE_EDITED);
    });

    it("Verify Manager can view dismissed notice after Admin edits it", () => {
        cy.login(c.MANAGER_USERNAME, c.MANAGER_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE_EDITED);
    });

    it("Verify Author can view dismissed notice after Admin edits it", () => {
        cy.login(c.AUTHOR_USERNAME, c.AUTHOR_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE_EDITED);
    });

    it("Verify Researcher can view dismissed notice after Admin edits it", () => {
        cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD);
        noticeHelper.userViewNotice(NOTICE_ONE_EDITED);
    });

    it("Verify Admin can delete notice", () => {
        cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
        noticeHelper.deleteNotice(NOTICE_TWO);
    });

    it("Verify Teacher can not see deleted notice", () => {
        cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD);
        noticeHelper.userCannotViewNotice(NOTICE_TWO);
    });

    it("Verify Manager can not see deleted notice", () => {
        cy.login(c.MANAGER_USERNAME, c.MANAGER_PASSWORD);
        noticeHelper.userCannotViewNotice(NOTICE_TWO);
    });

    it("Verify Author can not see deleted notice", () => {
        cy.login(c.AUTHOR_USERNAME, c.AUTHOR_PASSWORD);
        noticeHelper.userCannotViewNotice(NOTICE_TWO);
    });

    it("Verify Researcher can not see deleted notice", () => {
        cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD);
        noticeHelper.userCannotViewNotice(NOTICE_TWO);
    });

    it("Cleanup - Delete all notices created", () => {
        cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);// Login as admin user
        noticeHelper.deleteNotice(NOTICE_ONE_EDITED);
        //NOTICE TWO IS ALREADY DELETED AS PART OF THE DELETE NOTICE VERIFICATION
    });

});
