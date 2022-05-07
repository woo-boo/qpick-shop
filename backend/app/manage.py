#!/bin/env python

import click
from click import echo

from utils.create_superuser import create_superuser
from utils.runserver import runserver


@click.group()
def entry_point():
    pass


entry_point.add_command(create_superuser)
entry_point.add_command(runserver)


if __name__ == '__main__':
    entry_point()