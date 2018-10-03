select * from scores s
join users u on u.user_id = s.user_id
order by points desc;