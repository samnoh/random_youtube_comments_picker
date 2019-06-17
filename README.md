# Random Youtube Comments Picker

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
- `VIDEO_URL`: Any Youtube link butn playlist link
- `FILTER_NULL_EMAIL=true`: Users with no emails are also shown
- `NUMBER_OF_WINNERS=3`: The number of winners
- `HIDE_EMAIL_ON_CONSOLE=true`
- `NO_WINNERS=false`: Pick up random winners

## Usage

```Shell
npm start
```

- Pick up random winners and save their comments
- Save all comments (`NO_WINNERS=true`)
