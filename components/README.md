# NavBar

this is the app bottom naivation bar:

- it handles navigation between pages.
- supports Authentication-protected routes (navigation is paused during authentication flow)

### Architecture decision

- highligthed page determined using usePathname(), as useState would reset on refresh 
- Authentication logic abstracted into @/lib/AuthHandler


# FilterPanelMain

the fitler panel applies the filters right away through the HandleToggle function.  the filters are sent back to the filter state in main page in real time
thus the apply button is meaningless for the functioning of the filter selection. it is used purely as a UX button to close the filter panle and give user sense of control
  
  
