/* eslint-disable no-undef */
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { tableCell } from '../cyhelper'

const url = 'http://localhost:8080'

Given('I open SkillBill page', () => {
  cy.visit(url)
})

When('I click on Skill_1 dropdown and select "Go"', () => {
  cy.get("[data-test='filter_skill_1']").click({ force: true })
  cy.get('div.menuable__content__active div:nth-child(4) a div div').click()
  // cy.wait(1500)
  // cy.scrollTo(0, 0)
})

When('I click on Rank_1 dropdown and select "4"', () => {
  cy.get("[data-test='filter_rank_1']").click({ force: true })
    .get('div.menuable__content__active div:nth-child(2) a div div').click()
  // cy.wait(250)
  // cy.scrollTo(0, 0)
})

When('I click on Skill_2 dropdown and select "JS"', () => {
  cy.get("[data-test='filter_skill_2']").click({ force: true })
    .get('div.menuable__content__active div:nth-child(4) a div div').click()
  // cy.wait(250)
  // cy.scrollTo(0, 0)
})

When('I click on Rank_2 dropdown and select "2"', () => {
  cy.get("[data-test='filter_rank_2']").click({ force: true })
    .get('div.menuable__content__active div:nth-child(4) a div div').click()
  // cy.wait(250)
  // cy.scrollTo(0, 0)
})

When('I click on Skill_3 dropdown and select "Android"', () => {
  cy.get("[data-test='filter_skill_3']").click({ force: true })
    .get('div.menuable__content__active div:nth-child(1) > a div div').click()
  // cy.wait(250)
  // cy.scrollTo(0, 0)
})

When('I click on Rank_3 dropdown and select "1"', () => {
  cy.get("[data-test='filter_rank_3']").click({ force: true })
    .get('div.menuable__content__active div:nth-child(5) a div div').click()
  // cy.wait(250)
  // cy.scrollTo(0, 0)
})

When('I click on Search button', () => {
  cy.get("[data-test='btnSearch']").click() // .wait(2000)
  // cy.wait(250)
  cy.scrollTo(0, 0)
})

Then('I see the 1st row with Go=4+, JS=2+ and Android=1+', () => {
  cy.get(tableCell(1, 5)).should('contain', 'Go')
  cy.get(tableCell(1, 6)).contains(/[4,5]/).should('exist')
  cy.get(tableCell(1, 7)).should('contain', 'JS')
  cy.get(tableCell(1, 8)).contains(/[3,4,5]/).should('exist')

  cy.get(tableCell(1, 9)).should('contain', 'Android')
  cy.get(tableCell(1, 10)).contains(/[1,2,3,4,5]/).should('exist')

  cy.get(tableCell(2, 5)).should('contain', 'Go')
  cy.get(tableCell(2, 6)).contains(/[4,5]/).should('exist')

  cy.get(tableCell(2, 7)).should('contain', 'JS')
  cy.get(tableCell(2, 8)).contains(/[2,3,4,5]/).should('exist')

  cy.get(tableCell(2, 9)).should('contain', 'Android')
  cy.get(tableCell(2, 10)).contains(/[1,2,3,4,5]/).should('exist')
})
