#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    server_port = 7000
    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    if sys.argv[1] == 'runserver' and len(sys.argv) == 2:
        execute_from_command_line(sys.argv + [str(server_port)])
    else:
        execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
