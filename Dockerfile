FROM node AS frontend
WORKDIR /home/frontend
COPY frontend/ ./
RUN npm install
RUN npm run build


FROM python:slim
WORKDIR /home/app
COPY backend/ ./
COPY --from=frontend /home/frontend/build /home/app/static
RUN pip install pipenv \
    && pipenv install --system --deploy \
    && apt-get update && apt-get install -y libmagic1
CMD python ./app/manage.py runserver