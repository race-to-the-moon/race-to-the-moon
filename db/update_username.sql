update users
    set username = $1, 
    icon = $2
where auth_id = $3
returning *;