## postgres tutorial

http://www.postgresqltutorial.com/

## psql commands

\du show all users

\q exit

\dx show installed extensions

\df describe functions

\dt show tables

LOGIN COMMANDS

psql -d mydb -U myuser
psql -h myhost -d mydb -U myuser

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE <table name> CASCADE
example:
DROP TABLE product CASCADE
