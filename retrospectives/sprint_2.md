Retrospective sprint 2 (team 11)
=====================================


- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed and done:
    - 6 committed
    - 6 done
- Total points committed vs done:
    - 49 committed
    - 49 done
- Nr of hours planned vs spent (as a team):
    - 72h 30m planned
    - 71h 35m spent

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
|  _0_   |     6    |    N/A   |      32h 30m      |      35h 5m        |
| 6   |     1    |    8   |      1h 30m      |      30m        |
|   7    |     3    |    5    |      5h 30m      |       3h 35m       |
|   8    |     1    |     5   |       2h     |        1h      |
|    9   |     2    |    5    |      4h 30m      |       2h 55m       |
|    10   |     4    |    13    |      13h 30m      |      10h 30m        |
|   11    |     3    |    13    |      13h      |      18h        |

- Hours per task (average, standard deviation)
    - average: 3h 30m
    - standard deviation: 4h

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table
    - task estimation error ratio: 1.01


## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
    - 11h 30m
  - Total hours spent
    - 12h 50m
  - Nr of automated unit test cases 
    - 137
  - Coverage (from sonarcloud)
    - 53.9 %
- E2E testing:
  - Total hours estimated
    - 11h 30m
  - Total hours spent
    - 12h 05m
- Code review 
  - Total hours estimated 
    - 1h 30m
  - Total hours spent
    - 2h 30m
- Technical Debt management:
  - Total hours estimated 
    - 2h
  - Total hours spent
    - 2h
  - Hours estimated for remediation by SonarQube
     - 5h
  - Hours spent on remediation
    - 2h 
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
    - 0.9 % 
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability: A
    - security review: E
    - security: A
    - maintainability: A

## ASSESSMENT

- What caused your errors in estimation (if any)?
    - We expected to need less time to work with the charts library, since it was the first time we used it.
    - For story 7 the check was similar to story 9, so we spent little time to do it.

- What lessons did you learn (both positive and negative) in this sprint?
    - Like for story 11, if we need to start using a new library we should expect to spend more time to learn it.

- Which improvement goals set in the previous retrospective were you able to achieve? 
    - We successfully logged time to code review.
    - We managed to stick to the 6 hours per week time budget
  
- Which ones you were not able to achieve? Why?
    - None

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
    - Better repository management: for example, working on a separate branch and then merging it to master.
    - Improve the sonarcloud test coverage.

- One thing you are proud of as a Team!!
    - We managed to complete all committed stories, considering also that they were more story points-heavy than the previous sprint.