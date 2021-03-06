var num_channels_display = 10;
var num_videos_display = 10;

var selected_channels = channels;

window.addEventListener('load', (event) => {
    channels_to_display = selected_channels.slice(0,num_channels_display);
    var videos_to_display = videos.slice(0,num_videos_display);
    displayChannels(channels_to_display);
    // displayVideos(videos_to_display);
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var load_more_button = document.createElement("a");
    load_more_button.innerText = "Load more...";
    load_more_button.className = "nav-link";
    load_more_button.setAttribute("id", "load_more_channels_button");
    load_more_button.setAttribute("onclick", "increaseDisplayedChannels()");

function increaseDisplayedChannels(){
    num_channels_display += 10;
    channels_to_display = selected_channels.slice(0,num_channels_display);
    // if channels_to_display.length != num_channels_display:
    // if (channels_to_display.length == num_channels_display) {
    //     console.log(load_more_button)
    //     load_more_button.hide();
    // }
    displayChannels(channels_to_display);
};


function displayChannels(channels_to_display){

    var channelsDisplay = document.getElementById("channel_display_list").querySelector(".simplebar-content");

    // Remove all children so as to not have duplicate channels displayed
    removeAllChildNodes(channelsDisplay)

    // Get the amount of channels to display
    for (let i=0; i<channels_to_display.length;i++){
        var channel = channels_to_display[i];

        var channel_item = document.createElement("li");
        channel_item.className = "nav-item";

        var channel_link = document.createElement("a");
        // channel_link.className = "nav-link";
        channel_link.className = "channel_entry nav-link";
        channel_link.setAttribute("href", `/channel/${channel.name_id}?subview_mode=${subview_mode}`);

        var channel_name = document.createElement("span")
        channel_name.className = "ml-1";
        channel_name.innerHTML = ` ${channel.name}`

        var channel_img = document.createElement("img")
        channel_img.className = "channel_logo";
        channel_img.setAttribute("src", `${channel.logo_url}`);

        channel_link.appendChild(channel_img);
        channel_link.appendChild(channel_name);
        channel_item.appendChild(channel_link);
        channelsDisplay.appendChild(channel_item);

    };
    var button_div = document.createElement("li")
    button_div.className = "nav-item";

    if (channels_to_display.length != selected_channels.length) {

        var load_more_button = document.createElement("a");
        load_more_button.innerText = "Load more...";
        load_more_button.className = "nav-link";
        load_more_button.setAttribute("id", "load_more_channels_button");
        load_more_button.setAttribute("onclick", "increaseDisplayedChannels()");
    }

    button_div.appendChild(load_more_button)
    channelsDisplay.appendChild(button_div)
};


// 
// NOT BEING USED
// 

function increaseDisplayedVideos(){
    num_videos_display += 10;
    videos_to_display = videos.slice(0,num_videos_display);
    displayVideos(videos_to_display);

};

function displayVideos(videos_to_display){

    var videosDisplay = document.getElementById("video_display_list").querySelector(".simplebar-content");

    // Remove all children so as to not have duplicate videos displayed
    removeAllChildNodes(videosDisplay)

    for (let i=0; i<videos_to_display.length;i++){

        var vid = videos[i];

        var video_link = document.createElement("a");
        video_link.setAttribute("href", `/video/${vid.id}`);

        var video_img = document.createElement("img")
        video_img.className = "video_list_thumb";
        video_img.setAttribute("src", `https://i.ytimg.com/vi/${vid.id}/default.jpg`);

        videosDisplay.appendChild(video_img);
        videosDisplay.appendChild(video_link);

    };
    if (displayLoadMore){
        // console.log(displayLoadMore)
        var load_more_button = document.createElement("button");
        load_more_button.innerText = "Load more...";
        load_more_button.setAttribute("id", "load_more_vids_button");
        load_more_button.setAttribute("onclick", "increaseDisplayedVideos()");

        videosDisplay.appendChild(load_more_button);
    }
};