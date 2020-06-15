#!/bin/bash

# Bail on errors.
set -e

: ${CONTAINER_NAME:="qhsearch_demo_es"}
: ${ES_CONFIG:="/usr/share/elasticsearch/config/elasticsearch.yml"}
: ${ES_HOST:="localhost"}
: ${ES_PORT:="9300"}

# Start a docker container.
echo "Starting ES container."
docker run -p $ES_PORT:9200 -d --name $CONTAINER_NAME elasticsearch:2.4.4

# Write ES settings.
echo "Writing ES config to $ES_CONFIG."
docker exec -i $CONTAINER_NAME dd of=$ES_CONFIG < ./data/elasticsearch.yml


# Restart container.
echo "Restarting container."
docker restart $CONTAINER_NAME

# Wait until ES is available.
printf "Waiting for elasticsearch to become available."
until curl -s -o /dev/null -XGET "http://$ES_HOST:$ES_PORT/_search"; do
  >&2 printf "."
  sleep 1
done

>&2 printf "ready."

# Delete index (if it exists).
# printf "Attempting to delete previous index."
# curl -s -S -XDELETE "http://$ES_HOST:$ES_PORT/events"

# Create mapping for data. Note the trailing slash.
printf "creating index"
curl -X GET "localhost:9300/_cat/indices/"


printf "\n\nCreating mapping."
curl -s -S -o /dev/null -XPUT "http://$ES_HOST:$ES_PORT/questions3/" --data-binary @data/qhdata-mappings2.json


# Insert data. This order is important 
printf "\n\nInserting data."
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p1.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p2.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p3.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p4.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p5.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p6.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p7.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p8.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_p9.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_10.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_single_1.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_11.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_12.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_single_2.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_13.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_single_3.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_14.ndjson
curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/22Mayoutfile_full_date_15.ndjson
# curl -s -S -o /dev/null -XPOST "localhost:9300/_bulk" --data-binary @data/merged_file.ndjson

printf "\n\nElasticsearch setup done, next: 'npm start'.\n\n"

npm start