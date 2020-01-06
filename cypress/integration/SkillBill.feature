Feature: The SkillBill

  I want to open SkillBill page

  # Scenario: Opening SkillBill page
  #   Given I open SkillBill page
  #   Then I see "SkillBill" in the title


  Scenario: Testing database filtering
    Given I open SkillBill page

    When I click on Skill_1 dropdown and select "Go"
    When I click on Rank_1 dropdown and select "4"
    When I click on Skill_2 dropdown and select "JS"
    When I click on Rank_2 dropdown and select "2"

    When I click on Skill_3 dropdown and select "Android"
    When I click on Rank_3 dropdown and select "1"
    When I click on Search button

    Then I see the 1st row with Go=4+, JS=2+ and Android=1+


