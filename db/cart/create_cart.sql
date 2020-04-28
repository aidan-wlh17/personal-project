insert into user_cart (
    user_id,
    paid
) values (
    $1,
    false
)
returning user_id, paid, cart_id;