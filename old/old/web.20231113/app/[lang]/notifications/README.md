# branch
branch ST-3205_MIGRATION_-_The_legacy_notifications_page

# requette 

https://localhost:3450/notifications/list?skip=10&limit=10&sortName=insertedAt&sortOrder=desc

{
	"GET": {
		"scheme": "https",
		"host": "localhost:3450",
		"filename": "/notifications/list",
		"query": {
			"skip": "10",
			"limit": "10",
			"sortName": "insertedAt",
			"sortOrder": "desc"
		},
		"remote": {
			"Adresse": "127.0.0.1:3450"
		}
	}
}


# search 
	https://localhost:3450/notifications/list?skip=0&limit=10&sortName=insertedAt&sortOrder=desc&eleFilters[str]=broker

  {
	"GET": {
		"scheme": "https",
		"host": "localhost:3450",
		"filename": "/notifications/list",
		"query": {
			"skip": "0",
			"limit": "10",
			"sortName": "insertedAt",
			"sortOrder": "desc",
			"eleFilters[str]": "broker"
		},
		"remote": {
			"Adresse": "127.0.0.1:3450"
		}
	}
}


# mark all as read 
https://localhost:3450/notification/read/all


# mark one unread 
https://localhost:3450/notification/unread/654e0e5f05af2999296c97ac

{
	"POST": {
		"scheme": "https",
		"host": "localhost:3450",
		"filename": "/notification/unread/654e0e5f05af2999296c97ac",
		"remote": {
			"Adresse": "127.0.0.1:3450"
		}
	}
}

# mark one read 
https://localhost:3450/notification/read/654e0e5f05af2999296c97ac
{
	"POST": {
		"scheme": "https",
		"host": "localhost:3450",
		"filename": "/notification/read/654e0e5f05af2999296c97ac",
		"remote": {
			"Adresse": "127.0.0.1:3450"
		}
	}
}

suivie de list (avec skip=? et limit = ? )