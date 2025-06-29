// config.js
Config = {}; // Don't touch

Config.ServerIP = "localhost:30120";

// Social media buttons on the left side
Config.Socials = [
    {name: "worlwide", label: "Worlwide", description: "Click here to copy the link and join our Discord server!", icon: "assets/media/icons/worlwide.png", link: "https://Ar7340.net"},
    {name: "twitter", label: "Twitter", description: "Click here to copy the link and join our Discord server!", icon: "assets/media/icons/twitter.png", link: " https://twitter.com/Ar7340"},
    {name: "telegram", label: "Telegram", description: "An Instagram page will open for us soon, feel free to join and follow us!", icon: "assets/media/icons/telegram.png", link: " https://t.me/+Ij_hKxllaQVmYjNl"},
    {name: "discord", label: "Discord", description: "For donations, feel free to look at the room - #Donations at Discord.", icon: "assets/media/icons/discord.png", link: "https://discord.gg/aCbukXjc4M"},
];

Config.HideoverlayKeybind = 112 // JS key code https://keycode.info
Config.CustomBindText = "F1"; // leave as "" if you don't want the bind text in html to be statically set

// Update the Categories section to exclude Staff
Config.Categories = [
    // {label: "Social Media", default: false},
    // {label: "Staff", default: false}
];

// Music
Config.Song = "song.mp3";
