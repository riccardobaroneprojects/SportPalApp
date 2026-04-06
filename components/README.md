# NavBar

this is the app bottom naivation bar:

- it handles navigation between pages.
- supports Authentication-protected routes (navigation is paused during authentication flow)

### Architecture decision

- highligthed page determined using usePathname(), as useState would reset on refresh 
- Authentication logic abstracted into @/lib/AuthHandler
  
  
