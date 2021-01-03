#!/bin/sh

set -e

if [ ! -f /backend/data/db.sqlite3 ]; then
	cp /backend/data/initial_db.sqlite3 /backend/data/db.sqlite3
fi

python manage.py migrate
python manage.py runserver 0.0.0.0:7000
