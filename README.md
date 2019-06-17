# Random Youtube Comments Picker

- cli
- Random winner generator of Youtube comments for giveaways

## Install

```Shell
git clone https://github.com/samnoh/random_youtube_comments_picker.git
cd random_youtube_comments_picker
npm i -g
```

## Requirements

- Node.js & npm (or yarn)
- You should have your own Youtube API key - [Link](https://developers.google.com/youtube/v3/getting-started)
- Edit .env file before running

## .env

- `API_KEY`: Your own Youtube API Key
- `FILTER_NULL_EMAIL=false`: Filter comments with no emails
- `HIDE_EMAIL_ON_CONSOLE=true`: Hide parts of winners' email addresses on console for privacy

## Usage

```Shell
youtube-comment <youtube url> [number of winners]
```

- Pick up random winners and save their comments.
- Or save all comments for data archiving purposes (`youtube-comment <youtube url>`). Do not use it for spamming!

#### Example

- Pick 7 winners

```Shell
youtube-comment https://www.youtube.com/watch?v=nNVMvXTOgkI 7
```

- Download all comments

```Shell
youtube-comment https://www.youtube.com/watch?v=Rx9NoQ1uknI
```

## Uninstall

```Shell
npm rm -g random_youtube_comments_picker
```
