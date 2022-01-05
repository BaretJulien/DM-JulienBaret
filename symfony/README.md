# Docker Compose
## Symfony
### Requirements
- MariaDB 10: an available MariaDB server running on port `3306` and host `db` with the username as `symfony`, the password as `symfony` and a database named `symfony`.

### How to run
Copy the environment file
```sh
cp .env .env.local
```

Install dependencies with composer
```sh
composer install
```

Create the database if it does not exist
```sh
php bin/console doctrine:database:create --if-not-exists
```

Create the database schema
```sh
php bin/console doctrine:schema:update
```
