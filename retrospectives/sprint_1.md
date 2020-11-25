Sprint 1 retrospective (team 11)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done  
    - 5 stories committed
    - 5 stories done
- Total points committed vs done
    - 25 points committed
    - 25 points done
- Nr of hours planned vs spent (as a team)
    - 68.25 hours planned
    - 67.3 hours done


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |     7     |    N/A   |      29h 15m      |       28h 45m     |
| _#1_       |    2     |   5     |      11h      |       6h 50m       |
| _#2_      |     1    |    8    |     6h       |       6h 30m       |
| _#3_      |     2    |    2    |     8h       |        7h 30m      |
| _#4_      |     1    |    5    |      4h      |       4h 30m       |
| _#5_       |    2     |    5    |      10h      |      12h 55m        |

- Hours per task (average, standard deviation):
    - Average: 4.5 hrs per task
    - Standard deviation: 1.5 hrs

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table:
    -  68.25 / 67 =  1.02

## QUALITY MEASURES 

- Unit and E2E Testing:
  - Total hours estimated
    - 12h
  - Total hours spent
    - 8h 10m
  - Nr of automated unit test cases 
    - 56
  - Coverage (if available)
    - 46.8 %
- Technical Debt management:
  - Total hours estimated 
    - N/A
  - Total hours spent
    -  20m
  - Hours estimated for remediation by SonarQube
    - 2h
  - Hours spent on remediation
    - 20m
  - debt ratio
    - 0.2 %
  - rating for each quality characteristic reported in SonarQube under "Measures"
    - reliability: A
    - security: A
    - maintainability: A

## ASSESSMENT

- What caused your errors in estimation (if any)?
    - In general our estimations were pretty accurate, in fact our task estimation error ratio is just 1.02; the worst estimation was on the first story, because we overestimated by around 4 hrs.

- What lessons did you learn (both positive and negative) in this sprint?
    - We spent more time on tests than in the prevoius project, but still not enough (only 47 % coverage). 
    - We experimented with new technologies to make the project better, as opposed to sticking with what we know. For example with the process of automatically sending out emails.

- Which improvement goals set in the previous retrospective were you able to achieve? 
    - We spent more time in the beginning to carefully design the database, so that we didn't need to modify the db schema during the sprint.
  
- Which ones you were not able to achieve? Why?
     - We feel like we got better at logging our work, but still we weren't precise enough: for example, we didn't separately log time spent on code review.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
    - Log time for code review.
    - Try to stick with the 6h per week time budget.

- One thing you are proud of as a Team!!
    - We were able to deliver a stable and working product in a short time.
