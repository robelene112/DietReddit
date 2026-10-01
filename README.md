# Diet Reddit

A lean reddit client.

## Reddit API

Reddit posts and comments are loaded through `/api/reddit`, a Netlify Function.
The browser calls its own origin, and the function requests Reddit's public JSON
endpoints. No credentials are required by the app in this mode. This removes the
browser's cross-origin dependency for both posts and comments.

Opening a Reddit JSON URL directly in a browser can work even when a cross-origin
fetch is rejected. Reddit can also reject requests from a hosting provider with
a 403 or rate-limit them with a 429. The proxy preserves those failures and shows
a readable error; it cannot guarantee Reddit will accept requests from Netlify.

## Setup and deployment

Use Node.js 22 or later. Netlify builds the frontend and deploys the function
using `netlify.toml`. Deploy the repository, rather than only the static `build`
directory, so the function is deployed too. The API route uses a
[Netlify rewrite](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/).

`npm start` uses the same backend handler locally. Restart the development server
after changing backend configuration.

### Optional Reddit authentication

If you have approved Reddit API access, configure both credentials in Netlify
with the Functions scope to use application-only OAuth instead of public JSON:

- `REDDIT_CLIENT_ID`: the ID of a Reddit app with API access.
- `REDDIT_CLIENT_SECRET`: its client secret.
- `REDDIT_USER_AGENT`: a descriptive identity, such as
  `web:dietreddit:v0.1.0 (by /u/YOUR_REDDIT_USERNAME)`.

Use a confidential app that supports the `client_credentials` grant. See
[Reddit's application-only OAuth documentation](https://github.com/reddit-archive/reddit/wiki/OAuth2#application-only-oauth).
Valid credentials do not override restrictions on an app's Reddit API access.
See Reddit's [current API access requirements](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki).
Do not prefix these variables with `REACT_APP_`; credentials belong only on the
server. For `npm start`, put the same variables in the ignored `.env.local` file
and restart the development server.

Run proxy tests with `node --test tests/reddit.test.cjs`.
