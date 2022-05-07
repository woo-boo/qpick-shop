from distutils.log import debug
import click
from click import echo

@click.command()
def runserver():
    import uvicorn
    echo('Starting dev server....')
    uvicorn.run("main:app", reload=True, debug=True, host='0.0.0.0', port=8000)