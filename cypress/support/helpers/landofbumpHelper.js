import {LandOfBumpElements as e} from "../elements/land_of_bump_elements";
import {controlText as c} from "../testdata/testdata_automatedtestactivity_landofbump_ap";

export function answerQuestionsInPage(part){ 
        switch(part){
            case 'Part1':
                verifyFirstPart();
                break;
            case 'Part2':  
                verifySecondPart();
                 break;
            case 'Part3':
                verifyThirdPart();   
                 break;
            case 'Part4':
                verifyFourthPart();   
                 break;
            case 'Part5':
                verifyFifthPart(); 
                 break;
            case 'Part6':
                verifySixthPart(); 
                 break;
            case 'Part7':
                verifySeventhPart(); 
                 break;
        }
}

export function verifyFirstPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.verifyInitalForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.getBackwardArrow().should("exist");
    e.verifyForwardArrowDisabled();
    e.verifyControlText(c[0].text.text1);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[0].text.text2);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[0].text.text3);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[0].text.text4);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[0].text.text5);
    e.playAudio();
    e.getForwardArrow().should("not.exist");  
}

export function verifySecondPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.getForwardArrow().should("not.exist");
    e.verifyControlText(c[1].text.text1);
    e.playAudio();  
}

export function verifyThirdPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.getForwardArrow().should("not.exist");
    e.verifyControlText(c[2].text.text1);
    e.playAudio();  
}

export function verifyFourthPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.verifyForwardArrowDisabled();
    e.verifyControlText(c[3].text.text1);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[3].text.text2);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[3].text.text3);
    e.playAudio();
    cy.wait(15000);
    e.playAudio();
    e.verifyControlText(c[3].text.text4);
    cy.wait(15000);
    e.playAudio();
    e.verifyControlText(c[3].text.text5);
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[3].text.text6);
    e.playAudio();
    e.getForwardArrow().should("not.exist");  
}

export function verifyFifthPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.verifyForwardArrowDisabled();
    e.verifyControlText(c[4].text.text1);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[4].text.text2+c[4].text.text3);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[4].text.text4);
    e.playAudio();
    cy.wait(15000);
    e.playAudio();
    e.verifyControlText(c[4].text.text5);
    cy.wait(15000);
    e.playAudio();
    e.verifyControlText(c[4].text.text6);
    e.getForwardArrow().should("not.exist");  
}

export function verifySixthPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.verifyForwardArrowDisabled();
    e.verifyControlText(c[5].text.text1+c[5].text.text2+c[5].text.text3);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[5].text.text4);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[5].text.text5);
    e.playAudio();
    cy.wait(15000);
    e.playAudio();
    e.verifyControlText(c[5].text.text6);
    cy.wait(15000);
    e.playAudio();
    e.verifyControlText(c[5].text.text7);
    e.getForwardArrow().should("not.exist");  
}

export function verifySeventhPart(){ 
    e.getBackwardArrow().should("not.exist");
    e.verifyForwardArrowDisabled();
    e.verifyControlText(c[6].text.text1);
    e.playAudio();
    e.verifyForwardArrowEnabled();
    e.getForwardArrow().click({ force: true });
    cy.wait(2000);
    e.verifyControlText(c[6].text.text2);
    e.playAudio();
    e.getForwardArrow().should("not.exist");  
}