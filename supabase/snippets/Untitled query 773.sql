DROP POLICY IF EXISTS "Allow owners to insert announcements" ON public.announcement;
CREATE POLICY "Allow owners to insert announcements"
ON public.announcement
FOR INSERT
TO authenticated
WITH CHECK ((select auth.uid()) = owner);

-- 2. Update Policy
DROP POLICY IF EXISTS "Allow owners to update announcements" ON public.announcement;
CREATE POLICY "Allow owners to update announcements"
ON public.announcement
FOR UPDATE
TO authenticated
USING ((select auth.uid()) = owner)
WITH CHECK ((select auth.uid()) = owner);

-- 3. Delete Policy
DROP POLICY IF EXISTS "Allow owners to delete announcements" ON public.announcement;
CREATE POLICY "Allow owners to delete announcements"
ON public.announcement
FOR DELETE
TO authenticated
USING ((select auth.uid()) = owner);