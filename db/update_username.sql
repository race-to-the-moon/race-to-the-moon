update users
    set username = $1, 
    icon = $2
where user_id = $3
returning *;