# %% [markdown]
# # **Generate data for database**
# 
# Author: Le Duc Quan<br>
# Introduce: This file will generate based on folder ./dataset <br>
# Input: ./dataset folder<br>
# Output: ./output folder : contains json file represent for each table<br>

# %%
import csv
import json
import numpy as np

# CONFIG

print("Start generate data")

ITEMS = 5  # Not able to change
VOUCHERS = 5    # Note: <= 5
USERS = 30  # Note: <= 30, if you want more, add more data in folder ./dataset/users.csv
SHIPPING_ADDRESS = 50 # Note: <= 50
ORDERS = USERS*4

status_pending = ORDERS*4//5
status_successful = ORDERS*1//9
status_cancel = ORDERS - status_pending - status_successful
NULL_VOUCHER = ORDERS*3//5

MAX_ITEMS_PER_ORDERS = 2
MAX_QUANLITY = 3

STAFFS = 3 # FIX

# %% [markdown]
# ### **1. Generate data for users table**

# %%
# Write it to ./output/users.json


csv_file_path_user = "./dataset/users.csv"
json_file_path_user = "./output/users.json"

# Open the CSV file and read its contents
with open(csv_file_path_user, newline='') as csv_file:
    csv_data = csv.DictReader(csv_file)

    # Convert the CSV data to a list of dictionaries
    data_list = []
    i = 0
    for row in csv_data:
        data_list.append(row)
        i += 1
        if i == USERS:
            break

# Write the converted data to a JSON file
with open(json_file_path_user, "w", encoding='utf-8') as json_file:
    json.dump(data_list, json_file)




# %% [markdown]
# ### **2. Generate data for vouchers table**

# %%
# Write it to vouchers_table


csv_file_path_voucher = "./dataset/vouchers.csv"
json_file_path_voucher = "./output/vouchers.json"

# Open the CSV file and read its contents
with open(csv_file_path_voucher, newline='') as csv_file:
    csv_data = csv.DictReader(csv_file)

    # Convert the CSV data to a list of dictionaries
    data_list = []
    i = 0
    for row in csv_data:
        data_list.append(row)
        i += 1
        if i == VOUCHERS:
            break

# Write the converted data to a JSON file
with open(json_file_path_voucher, "w",encoding='utf-8') as json_file:
    json.dump(data_list, json_file)

map_vouchers_value = {}
for i in range(len(data_list)):
    map_vouchers_value[i+1] = int(data_list[i]['value'])

# Generate voucher for each orders
voucher_order = [np.random.randint(1,VOUCHERS+1) for i in range(ORDERS-NULL_VOUCHER)]
voucher_order.extend([None for i in range(NULL_VOUCHER)])
np.random.shuffle(voucher_order)

# %% [markdown]
# ### **3. Generate data for items table**

# %%
# Write it to items_table
# Nothing

# Open the JSON file for reading
with open('./output/items.json', 'r',encoding='utf-8') as f:
    # Load the JSON data from the file
    items_list = json.load(f)

map_item_price = {}
for i in range(len(items_list)):
    map_item_price[i+1] = items_list[i]["price"]
map_item_price


# %% [markdown]
# ### **4. Generate data for Orders and Orderdetails table**

# %%
# Generate id for users
random_users_id = np.random.randint(1, USERS+1, ORDERS)


# Generate status for each orders
status_order = [0 for i in range(status_pending)]
status_order.extend([1 for i in range(status_successful)])
status_order.extend([-1 for i in range(status_cancel)])
np.random.shuffle(status_order)

# Store shipping_address
with open('./dataset/shipping_address.txt', 'r',encoding='utf-8') as f:
    arr_address = f.read().split('\n')

# Store staff_name
with open('./dataset/staff_name.txt', 'r',encoding='utf-8') as f:
    arr_staff = f.read().split('\n')

# Generate order detail
order_details = []
orders = []
order_id = 0

for user_id in random_users_id:
    # Define number of items
    n_items = np.random.randint(1, MAX_ITEMS_PER_ORDERS+1)
    total_price = 0

    status = status_order[order_id]
    voucher_id = voucher_order[order_id]

    for i in range(n_items):
        item_id = np.random.randint(1, ITEMS+1)
        quanlity = np.random.randint(1,MAX_QUANLITY)
        total_price += quanlity * map_item_price[item_id]
        order_details.append({"item_id": int(item_id),
                             "order_id": int(order_id + 1),
                             "quantity": int(np.random.randint(1,MAX_QUANLITY))})
    if voucher_id != None:
        total_price -= map_vouchers_value[voucher_id]

    orders.append({
        "id": int(order_id + 1),
        "total_price": int(total_price), # OK
        "payment": int(1), # OK
        "status": int(status), # OK
        "staff_name": arr_staff[np.random.randint(0,len(arr_staff))], # OK
        "shipping_address": arr_address[np.random.randint(0,len(arr_address))], # OK
        "user_id": int(user_id),  # OK
        "voucher_id": None if voucher_id == None else int(voucher_id)    # OK
    })
    order_id += 1

# write JSON to file
with open('./output/orders.json', 'w', encoding="utf-8") as f:
    json.dump(orders,f,ensure_ascii=False)

with open('./output/orderdetails.json', 'w', encoding="utf-8") as f:
    json.dump(order_details,f,ensure_ascii=False)

print("Done")



