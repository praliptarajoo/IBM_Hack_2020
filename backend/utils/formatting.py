import pandas as pd

def format_data(data):
    data_list = list()
    for d in data:
        temp = dict()
        for key in d:
            temp[key] = eval(d[key])
        data_list.append(temp)
    return data_list

def prepare_dataframe(df):
    # Data Preparation encoding the categorical values
    category_dict = {'Beverages': 1, 'Rice Bowl': 2, 'Starters': 3, 'Pasta': 4, 'Sandwich': 5, 'Biryani': 6,
                     'Extras': 7, 'Pizza': 8, 'Seafood': 9, 'Other Snacks': 10, 'Desert': 11, 'Salad': 12, 'Fish': 13, 'Soup': 14}
    cuisine_dict = {'Thai': 1, 'Indian': 2, 'Italian': 3, 'Continental': 4}
    center_type_dict = {'TYPE_C': 1, 'TYPE_B': 2, 'TYPE_A': 3}

    df["category"] = df["category"].apply(lambda x: category_dict[x])

    df["cuisine"] = df["cuisine"].apply(lambda x: cuisine_dict[x])

    df["center_type"] = df["center_type"].apply(
        lambda x: center_type_dict[x])

    return df

def get_complete_data(data):
    # Merging data given data with extra information
    center_df = pd.read_csv("./backend/datasets/fulfilment_center_info.csv")
    meal_df = pd.read_csv("./backend/datasets/meal_info.csv")

    if isinstance(data, list):
        data_list = format_data(data)
        input_df = pd.DataFrame(data_list)
    else:
        input_df = data

    final_df = input_df.merge(meal_df, on='meal_id')

    final_df = final_df.merge(center_df, on='center_id')

    final_df = prepare_dataframe(final_df)

    final_data = final_df.to_dict()

    return final_data

def segregate_data(data_dict, keys):
    final_list = list()
    for i in range(0, len(list(data_dict.values())[0])):
        temp_list = list()
        for key in keys:
            temp_list.append(data_dict[key][i])
        final_list.append(temp_list)

    return final_list


def get_scoring_payload(data):
    final_data_dict = get_complete_data(data)
    fields = ['week', 'center_id', 'meal_id', 'base_price', 'checkout_price', 'homepage_featured', 'emailer_for_promotion', 'category', 'cuisine', 'city_code', 'region_code', 'center_type', 'op_area']
    values = segregate_data(final_data_dict, fields)

    scoring_payload = {"fields": fields, "values": values}

    return scoring_payload
