module.exports = {
	development: {
		ip: '127.0.0.1',
		port: 80,
		db: {
			host: '127.0.0.1',
			port: 3306,
			protocol: 'mysql',
			user: 'root',
			password: 'root',
			database: 'lhc',
			connectionLimit: 100
			}
		},
	production: {
		ip: '127.0.0.1',
		port: 8000,
		db: {
			host: '127.0.0.1',
			port: 3306,
			protocol: 'mysql',
			user: 'root',
			password: 'root',
			database: 'production',
			connectionLimit: 100
			}
		}
	};
