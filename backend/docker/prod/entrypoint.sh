#!/bin/sh

set -e

if [ ! -f /backend/data/db.sqlite3 ]; then
	cp /backend/data/initial_db.sqlite3 /backend/data/db.sqlite3
	python manage.py migrate
fi

gunicorn backend.wsgi -b 0.0.0.0:7000
