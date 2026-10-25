update auth.users
set raw_user_meta_data = raw_user_meta_data - 'account_type'
where email = 'riccardobarone.projects@gmail.com';