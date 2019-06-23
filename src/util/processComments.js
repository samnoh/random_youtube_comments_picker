const { getComments } = require('../lib/api');

const candidates = new Map();
let id = 0;

const processComments = async (nextPageToken = null) => {
    console.log('Process comments...');

    await getComments(nextPageToken)
        .then(({ items, nextPageTokenResult }) => {
            nextPageToken = nextPageTokenResult;
            return items.map(i => {
                const author = i.snippet.topLevelComment.snippet.authorDisplayName;
                const comment = i.snippet.topLevelComment.snippet.textDisplay;
                const email = /\w+@\w+\.\w+/g.exec(comment);

                if (
                    !candidates.has(author) &&
                    (process.env.FILTER_NULL_EMAIL == 'true' ? email : true)
                ) {
                    candidates.set(author, { author, id: ++id, email: email && email[0], comment });
                }
            });
        })
        .catch(error => {
            console.error(error);
        });

    if (!nextPageToken) return Promise.resolve(candidates);
    return processComments(nextPageToken);
};

module.exports = processComments;
