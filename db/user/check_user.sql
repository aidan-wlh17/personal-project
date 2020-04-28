select * from users u
join user_cart uc on u.user_id = uc.user_id
where u.username = $1
and uc.paid = false;
