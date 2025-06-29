
--loadscreen_manual_shutdown "yes"
loadscreen 'index.html'
fx_version 'cerulean'
game 'gta5'
lua54 'yes'
author 'Ar7340'
description 'Loading screen'
version '1.0.0'

files {
    '*.html',
    'assets/**/*.*',
    'assets/**/**/*.*'
}

loadscreen {
  'html/index.html'
}

-- client_script 'client.lua'

loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'
dependency '/assetpacks'