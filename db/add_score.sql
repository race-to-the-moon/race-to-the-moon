insert into scores (
    time,
    points,
    user_id
)
values
($1, $2, $3)

returning *;