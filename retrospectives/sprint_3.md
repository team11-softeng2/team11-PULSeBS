Retrospective sprint 3 (team 11)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done 
  - Committed: 5
  - Done: 5
- Total points committed vs done 
  - Committed: 39
  - Done: 39
- Nr of hours planned vs spent (as a team)
  - Planned: 72h
  - Spent: 77h 20m

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    6     |    -   |       43h     |     37h 15m         |
| 12      |     3    |   13     |     10h       |         17h 20m     |
| 13      |    3     |    5    |      5h      |      4h 45m        |
| 14      |    1     |   5     |       3h     |        3h      |
| 15      |    1     |     3   |       1h     |     30m         |
| 16      |    5     |    13    |     10h       |         14h 30m     |
   

- Hours per task (average, standard deviation)
  - Average: 4.07 h
  - Standard deviation: 3.93 h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table
  - Estimation error ratio: 0.93

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
    - 15h
  - Total hours spent
    - 15h
  - Nr of automated unit test cases 
    - 320
  - Coverage (if available)
    - 90.5 %
- E2E testing:
  - Total hours estimated
    - 15h
  - Total hours spent
    - 8h 5m
- Code review 
  - Total hours estimated 
    - 4h
  - Total hours spent
    - 4h 40m
- Technical Debt management:
  - Total hours estimated 
    - 2h
  - Total hours spent
    - 2h
  - Hours estimated for remediation by SonarQube
    - 9h
  - Hours spent on remediation 
    - 2h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
    - 0.4 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability: A
    - security: A
    - maintainability: A
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  - The biggest error in estimation was in story #12, especially for the conversion of the csv file both front-end and backend.
  - Still in story #12, we decided to use a new library, and so we spent a bit of time learning it.

- What lessons did you learn (both positive and negative) in this sprint?
  - Next time we start using a new library, we should account for more time to learn it first.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  - Better repository management: we definitley improved since we worked on different barnches and only merged to master at the definition of done. 
  - Improve test coverage: we improved sonarcloud coverage to 90 %
  
- Which ones you were not able to achieve? Why?
  - None

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - We can still do a better job in repository management.
  - Spend more time remediating technical debt.

- One thing you are proud of as a Team!!
  - Since we improved test coverage a lot, we were able to deliver a more reliable and high quality product.