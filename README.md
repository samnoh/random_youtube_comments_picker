# Random Youtube Comments Picker

- cli
- Random winner generator of Youtube comments for giveaways

## Install

```Shell
git clone https://github.com/samnoh/random_youtube_comments_picker.git &&
cd random_youtube_comments_picker &&
npm install
```

## Requirements

- You should have your own Youtube API key - [Link](https://developers.google.com/youtube/v3/getting-started)
- Edit .env file before running

## .env

- `API_KEY`: Your own Youtube API Key
- `VIDEO_URL`: Any Youtube link but playlist link
- `FILTER_NULL_EMAIL=false`: Fetch comments with no emails
- `NUMBER_OF_WINNERS=3`: The number of winners
- `HIDE_EMAIL_ON_CONSOLE=true`: Hide parts of winners' email addresses on console for privacy
- `NO_WINNERS=false`: Pick up random winners or all comments

## Usage

```Shell
npm start <youtube url>
```

- Pick up random winners and save their comments.
- or save all comments for data archiving purposes (`NO_WINNERS=true`). Do not use it for spamming.
