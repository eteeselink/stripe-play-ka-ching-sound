Ka-ching! 💰🎉
=============

A program that makes your computer make a "_Ka-ching!😊_" sound whenever a Stripe charge succeeds.

Uses the Stripe CLI, which has a great webhook listening feature that works without messing around with http tunnels (ngrok etc). 

Setup
-----
- Make sure you have [Node.js][2].
- [install Stripe CLI][1].
- Make a "Restricted API Key" in the Stripe Dashboard. Only enable Stripe CLI access (on the bottom of the list).

Usage
-----
You do not need to understand anything about Node.js or NPM to use this program. I recommend you use `npx` to run this program, which comes with Node. This will download `stripe-play-ka-ching-sound` if necessary, and then immediately run it:

```
npx stripe-play-ka-ching-sound <api_key>

# eg
npx stripe-play-ka-ching-sound rk_test_12345678901234567890etc
```

That's it! Gotta keep that terminal window open though. Hit `Ctrl+C` to exit.

Notes
-----
Depends on the excellent [sound-play][3] library, which only works on MacOS and Windows.

[1]: https://stripe.com/docs/stripe-cli#install
[2]: https://nodejs.org
[3]: https://www.npmjs.com/package/sound-play