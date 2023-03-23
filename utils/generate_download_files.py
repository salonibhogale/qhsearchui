#!/usr/bin/env python
import pandas as pd
import os
import ndjson
import csv


# This is where we will store the download-able files, to be served via NGINX
save_to_folder = "/home/ubuntu/ld_data_downloads/qh_downloads"
if(not os.path.exists(save_to_folder)):
    os.mkdir(save_to_folder)


# These are the source files!
tar_files = os.listdir('data')
tar_files = [i for i in tar_files if(i.endswith('.ndjson'))]


# Create a dataset with all the source files first
all_df = pd.DataFrame()
for tar_file in tar_files:
    with open(f"data/{tar_file}", 'r') as i_file:
        tmp_data = ndjson.load(i_file)
        
    tmp_df = pd.json_normalize(tmp_data)
    all_df = pd.concat([all_df, tmp_df])


# Clean and process the data

# 1. Drop empty columns
all_df = all_df.dropna(subset = 'ID', axis = 'index')
all_df = all_df.drop(['index._index', 'index._type'], axis = 'columns')

# 2. Convert the lists into comma-separated values
list_columns = ['member', 'state', 'gender', 'constituency_type', 'party', 'constituency']
for col in list_columns:
    all_df[col] = all_df[col].astype(str).apply(eval).str.join(", ")
    
    
# 3. Rename as per codebook
all_df = all_df.rename(columns = {
    'ID' : 'id',
    'ls_no' : 'ls_number',
    'starred_unstarred' : 'question_type',
    'Question' : 'question_text',
    'clean_answers' : 'answer_text'
})


keep_columns = [
    "id",
    "date",
    "ls_number",
    "ministry",
    "question_type",
    "question_text",
    "answer_text",
    "member",
    "party",
    "state",
    "constituency",
    "constituency_type",
    "gender",
    "subject",
]


all_df = all_df[keep_columns]


# Generate Assembly-wise data files
for ls_no in all_df['ls_number'].unique():
    tmp_df = all_df[all_df['ls_number'] == ls_no]
    out_path = os.path.join(save_to_folder, f"TCPD_QH_LS_{ls_no}.tsv")
    
    tmp_df.to_csv(
        out_path,
        sep = '\t',
        quoting = csv.QUOTE_ALL,
        quotechar = '"',
        index = False,
        compression = 'gzip'
    )
    
# All QH at once
all_df.to_csv(
    os.path.join(save_to_folder, "TCPD_QH.tsv"),
    sep = '\t',
    quoting = csv.QUOTE_ALL,
    quotechar = '"',
    index = False,
    compression = 'gzip'
)