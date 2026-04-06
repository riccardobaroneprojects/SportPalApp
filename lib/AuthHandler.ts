

{/* AuthHandler acts as middleware for every time an action requires the user to be logged in
    uses supabase auth manager to retrieve the user session token if one is present
    if session is not found it pushes reqAuth = true to the URL, forcing a page reload
    it saves the next href to redirect user upon sign in*/}
export const AuthHandler= (
  router: any,
  pathname: string,
  targetHref: string
) => {
  router.push(`${pathname}?reqAuth=true&next=${targetHref}`, { scroll: false });
  
  // Return false so the NavBar knows NOT to continue to the actual page
  return false;
};