Retrospective sprint 4 (team 11)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done 
  - Committed: 5
  - Done: 5
- Total points committed vs done 
  - Committed: 35
  - Done: 35
- Nr of hours planned vs spent (as a team)
  - Planned: 70h
  - Spent: 69h 20m

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    5     |    -   |    37h    |      29h 55m        |
| 17      |    2     |    8    |      7h      |        7h 55m      |
| 18   |   4      |    8  |     8h 30m       |      7h 45m        |
| 19   |    2     |    5   |      5h      |      5h        |
| 20   |     4    |    13   |      13h      |       17h 15m       |
| 21   |     1    |    1   |      1h 30m      |       1h 30m       |
   



- Hours per task (average, standard deviation)
  - average: 3.85 h 
  - standard deviation: 3.23 h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table
  - 1.01

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 16h
  - Total hours spent: 11h 50m
  - Nr of automated unit test cases: 391 
  - Coverage (if available): 90.5 %
- E2E testing:
  - Total hours estimated: 8h
  - Total hours spent: 7h
- Code review 
  - Total hours estimated: 5h 
  - Total hours spent: 6h
- Technical Debt management:
  - Total hours estimated: 5h
  - Total hours spent: 3h 30m
  - Hours estimated for remediation by SonarQube: 11h
  - Hours spent on remediation: 3h 30m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.5 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability: A
    - security: A
    - maintainability: A
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  - The error in the estimation was because of an underestimation of the integration with the backend

- What lessons did you learn (both positive and negative) in this sprint?
  - We should read carefully the story requirement before starting to implementing it to avoid wasting time.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  - We worked on a single branch dedicated to this sprint, because it made more sense since we were working on similar features (support officer and teacher).
  - We spent almost double the time on technical debt management.
  
- Which ones you were not able to achieve? Why?
  - None
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Reduce duplicated code and bring down to zero the code smells.

- One thing you are proud of as a Team!!
  - We delivered a high quality working product even with the holiday break in between.