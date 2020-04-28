update user_cart
set paid = true
where user_id = $1
and paid = false