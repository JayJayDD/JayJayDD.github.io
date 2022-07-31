# One small catalog of mods for Beat Banger 1.x
> *What is this?*

Static `Javascript`+`HTML`+`Bootstrap` web page that fetches a `JSON` database filled with mods from Beat Banger `#new-mods` channel. 
The database is maintaned by hand.
Built using a `Svelte` framework. The page itself is hosted on `GitHub Pages`.

> *You got kidnapped/bored/the database isn't maintaned anymore how can i build or host this myself?*

Fork this repo and/or head over to the `source` folder where you can get raw `svelte` project to work with.

> *How `db.json` is structured?*

```
id: <int> - magic key index (unused)
name: <string> - basic internal name for the mod (unused)
mod_title: <string> - name of the mod
mod_creator: <string> - chart/mod creator
mod_artist: <string> - mod original artist
song_artist: <string> - mods song artist
song_title: <string> - mods song title
release_date: <string YYYY/MM/DD> - mods original release
download_link: <url> - download link to mod
length: <string MM:SS> - song's or mod length
preview_imgs: <string '[name].[extension]'> - image preview name for the mod card
thumb_img: <string '[name].[extension]'> - mods thumbnail name
download_type: <string discord||mega> - download link type mostly used as a cosmetic indicator
status: <string finished||unfinished> - status of the mod (unused)
tags: <string> - mod tags with no spaces commas used as a separator
folder: <string> - mod root folder
bpm: <int> - bpm of the mod
```
