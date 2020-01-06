import '@percy/cypress'
import { tableCell } from './cyhelper'

describe('I. Dev skills filtering', () => {
  it.only('1. .. selecting Go=4, JS=2 and Android=1, should get at least 3 devs' + ' and pressing Clear button should clear all the select boxes', () => {
    cy.log('**0. App start: initial data to be downloaded ...**')

    cy.visit('http://localhost:8080')

    cy.log('**1. Skill_1 to be defined: Go**')
    cy.get("[data-test='filter_skill_1']").click({ force: true })
    cy.get('div.menuable__content__active div:nth-child(4) a div div').click()
    // cy.scrollTo(0, 0)

    cy.log('**2. Rank_1 to be defined = 4+**')
    cy.get("[data-test='filter_rank_1']").click({ force: true })
    cy.get('div.menuable__content__active div:nth-child(2) a div div').click()
    // cy.scrollTo(0, 0)

    cy.log('**3. Skill_2 to be defined: JS**')
    cy.get("[data-test='filter_skill_2']").click({ force: true })
    cy.get('div.menuable__content__active div:nth-child(4) a div div').click()
    // cy.scrollTo(0, 0)

    cy.log('**4. Rank_2 to be defined = 2+**')
    cy.get("[data-test='filter_rank_2']").click({ force: true })
    cy.get('div.menuable__content__active div:nth-child(4) a div div').click()
    // cy.scrollTo(0, 0)

    cy.log('**5. Skill_3 to be defined: Android**')
    cy.get("[data-test='filter_skill_3']").click({ force: true })
    cy.get('div.menuable__content__active div:nth-child(1) > a div div').click()
    // cy.scrollTo(0, 0)

    cy.log('**6. Rank_3 to be defined = 1**')
    cy.get("[data-test='filter_rank_3']").click({ force: true })
    cy.get('div.menuable__content__active div:nth-child(5) a div div').click()
    // cy.scrollTo(0, 0)

    cy.log('**7. Next: clicking the Search button ...**')
    cy.get("[data-test='btnSearch']").click() // .wait(2000)
    // cy.scrollTo(0, 0)

    cy.log('**8. Next: making snapshot (Percy)...**')
    cy.get('.application--wrap').click()
    cy.scrollTo(0, 0)
    cy.wait(1000)
    cy.percySnapshot('I. Dev skills filtering')

    cy.log('**9. Results displayed, tests are coming ...**')
    cy.get(tableCell(1, 5)).should('contain', 'Go')

    cy.get(tableCell(1, 6))
      .contains(/[4,5]/)
      .should('exist')

    cy.get(tableCell(1, 7)).should('contain', 'JS')

    cy.get(tableCell(1, 8))
      .contains(/[3,4,5]/)
      .should('exist')

    cy.get(tableCell(1, 9)).should('contain', 'Android')

    cy.get(tableCell(1, 10))
      .contains(/[1,2,3,4,5]/)
      .should('exist')

    cy.log('**10. Next: clicking the Clear button ...**')

    cy.get("[data-test='btnClear']")
      .click()
      .wait(1)
    // cy.scrollTo(0, 0)

    cy.log('**11. Next: testing if dropdowns are empty**')
    cy.get("[data-test='skill1']").should('contain', '')
    cy.get("[data-test='skill2']").should('contain', '')
    cy.get("[data-test='skill3']").should('contain', '')
    cy.get("[data-test='rank1']").should('contain', '')
    cy.get("[data-test='rank2']").should('contain', '')
    cy.get("[data-test='rank3']").should('contain', '')
  })
})

describe('II. Inserting and deleteing a dev', () => {
  it('1. New dev should be added to the view and after click on "Delete" icon, should be removed', () => {
    cy.visit('http://localhost:8080') //.wait(1)

    cy.get("[data-test='btnNewDev']").click({ force: true })
    cy.get("[data-test='first']").type('Hans')
    cy.get("[data-test='last']").type('Klops')

    cy.get('div:nth-child(11) div:nth-child(1) > a div div').click({ force: true })
    cy.get('div:nth-child(10) div:nth-child(4) > a div div').click({ force: true })
    cy.get('div:nth-child(9) div:nth-child(1) > a div div').click({ force: true })
    cy.get('div:nth-child(8) div:nth-child(2) > a div div').click({ force: true })
    cy.get('div:nth-child(7) div:nth-child(2) > a div div').click({ force: true })
    cy.get('div:nth-child(6) div:nth-child(3) > a div div').click({ force: true })
    cy.get('div:nth-child(5) div:nth-child(3) > a div div').click({ force: true })
    cy.get('div:nth-child(4) div:nth-child(4) > a div div').click({ force: true })

    cy.get("[data-test='btnSave']")
      .click({ force: true })
      .wait(1000)
    cy.get("[data-test='find']").type('klops')
    cy.get("[data-test='btnFind']")
      .click()
      .wait(2000)

    cy.log('_________________________ 1 ______________________________')

    cy.get(tableCell(1, 2))
      .contains('Consultant')
      .should('exist')
    cy.get(tableCell(1, 3))
      .contains('Hans')
      .should('exist')
    cy.get(tableCell(1, 4))
      .contains('Klops')
      .should('exist')

    cy.log('_________________________ 2 ______________________________')
    // cy.pause()

    cy.get('#app tr:nth-child(1) i:nth-child(3)')
      .click()
      .wait(1000)
    cy.get("[data-test='btnFind']")
      .click()
      .wait(2000)
    cy.scrollTo(0, 0)

    cy.log('_________________________ 3 ______________________________')

    cy.get(tableCell(1, 2))
      .contains('Consultant')
      .should('not.exist')
  })
})

describe('III. Editing a dev', () => {
  it('1. .. should show modified data of a dev', () => {
    cy.visit('http://localhost:8080') //.wait(2000)
    cy.get('tr:nth-child(1)')
      .find('[data-test="edit"]')
      .click()

    cy.get("[data-test='first']")
      .clear()
      .type('Miś')
    cy.get("[data-test='last']")
      .clear()
      .type('Uszatek')

    cy.get('div:nth-child(10) div:nth-child(5) a div div').click({ force: true }) // Architect

    cy.get("[data-test='email']")
      .clear()
      .type('Mis@Uszatek.pl')
    cy.get("[data-test='btnSave']").click({ force: true })
    cy.get("[data-test='find']").type('Uszatek')
    cy.get("[data-test='btnFind']").click()

    cy.get(tableCell(1, 2))
      .contains('Architect')
      .should('exist')
    cy.get(tableCell(1, 3))
      .contains('Miś')
      .should('exist')
    cy.get(tableCell(1, 4))
      .contains('Uszatek')
      .should('exist')
    cy.get('tr:nth-child(1)')
      .find('[data-test="edit"]')
      .click()

    cy.get("[data-test='first']")
      .clear()
      .type('Betty')
    cy.get("[data-test='last']")
      .clear()
      .type('Loo')

    cy.get('div:nth-child(10) div:nth-child(3) a div div').click({ force: true }) // Senior

    cy.get("[data-test='email']")
      .clear()
      .type('betty.loo@gmail.com')
    cy.get("[data-test='btnSave']").click({ force: true })
    cy.get("[data-test='btnSearch']").click({ force: true })
  })
})

describe('IV. Selected devs', () => {
  it('1. .. should be visible after being doubleclicked and button Selected was clicked. \
    After clicking Reset button, previous table id shown', () => {
    cy.visit('http://localhost:8080') //.wait(2000)

    cy.contains('Loo').dblclick()
    cy.contains('Maty').dblclick()
    cy.contains('Cuffin').dblclick()

    cy.get("[data-test='btnSelected']").click()

    cy.contains('Loo').should('exist')
    cy.contains('Maty').should('exist')
    cy.contains('Cuffin').should('exist')

    cy.get("[data-test='btnReset']")
      .click()
      .wait(1000)
    cy.get('table > tbody > tr')
      .its('length')
      .should('be.gte', 10)
  })
})
