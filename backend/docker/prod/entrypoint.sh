#!/bin/sh

set -e

if [ ! -f /files/is_initialized ]; then
	python manage.py migrate
	touch /files/is_initialized
fi

gunicorn backend.wsgi -b 0.0.0.0:7000
