import os, json
from util.constants import Topic
import numpy as np
import re
import math
from tqdm import tqdm

def get_name_using_regex(name):
    return re.sub(r"-?([A-z0-9]){8}-([A-z0-9]){4}-([A-z0-9]){4}-([A-z0-9]){4}-([A-z0-9]){12}", "", name)

DATA_DIR = os.path.join("..", "data")

for category in Topic._member_names_:
    std_data_mean_path = os.path.join(DATA_DIR, "thumbnail-latents", "categories", f"{category}.json")
    with open(std_data_mean_path, "r") as f:
        std_data_mean_file = json.load(f)
    std_data_mean = std_data_mean_file["avg_std_of_channels"]

    # Get channels info
    channels_info_path = os.path.join(DATA_DIR, "info_channels", f"channels-info_{category}.json")
    with open(channels_info_path, "r") as f:
        channels_dict = json.load(f)

    # Get videos info
    videos_info_path = os.path.join(DATA_DIR, "info_videos", f"videos-info_{category}.json")
    with open(videos_info_path, "r") as f:
        videos_dict = json.load(f)

    datapoints = []
    for name, vids in tqdm(videos_dict.items()):
        datapoint = {}
        with open(os.path.join(DATA_DIR, "thumbnail-latents", "channels", f"{name}.json")) as f:
            channel_std_dict = json.load(f)
        channel_std = channel_std_dict["std"]
        channel_avg_view = np.int(np.mean([vid["views"] for vid in vids]))
        datapoint["x"] = channel_std
        datapoint["y"] = channel_avg_view
        datapoint["name"] = get_name_using_regex(name)
        datapoint["name_id"] = name
        datapoint["subs"] = channels_dict[name]["Subscribers"]
        datapoint["logo_url"] = channels_dict[name]["logo_url"]
        datapoints.append(datapoint)

    final_std_data = {"mean" : std_data_mean, "datapoints": datapoints}

    if math.isnan(final_std_data["mean"]):
        final_std_data["datapoints"] = [d for d in final_std_data["datapoints"] if not math.isnan(d["x"])]
        final_std_data["mean"] = np.array([d["x"] for d in final_std_data["datapoints"] if not math.isnan(d["x"])]).mean()


    category_std_plot_data = os.path.join(DATA_DIR, "thumbnail-latents", "categories_plot_data", category + ".json")
    with open(category_std_plot_data, "w") as f:
        json.dump(final_std_data, f)