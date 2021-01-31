#!/usr/bin/env node

const sound = require("sound-play");
const path = require("path");
const execa = require("execa");
const chalk = require("chalk");
const readline = require('readline');

async function init() {

    let stripeArgs = [
        "listen",
        "--events", "charge.succeeded",
    ];

    const stripeKey = (process.argv[2] || "").trim();
    switch(stripeKey.substr(0, 7)) {
        case "rk_live":
            stripeArgs.push("--live");
            mode = "live";
            break;
        case "rk_test":
            mode = "test";
            break;
        default:
            usage();
    }

    readStdin();

    stripeArgs.push("--api-key", stripeKey);
    console.log(`Starting Stripe CLI (${mode} mode)...`);
    
    const stripe = execa("stripe", stripeArgs);
    stripe.stderr.on('data', data => {
        const text = data.toString("utf-8").trim();
        console.log(chalk.yellowBright(`[stripe] ${text}`));
    })
    stripe.stdout.on('data', data => {
        const text = data.toString("utf-8").trim();
        console.log(chalk.blueBright(`[stripe] ${text}`));

        if(text.includes("charge.succeeded")) {
            kaching();
        }
    });

    await stripe;
}

function usage() {
    console.log(`Usage:

  npx stripe-play-ka-ching-sound <API_KEY>
    
API_KEY must be a valid Stripe restricted API KEY (eg rk_test_somethingsomething).`);
    process.exit();
}

async function readStdin() {
    console.log("Type 'test' to test the 'ka-ching', hit Ctrl-C to quit.");

    const rl = readline.createInterface({
        input: process.stdin
    });
    for await(let line of rl) {
        if(line.trim() === "test") {
            kaching();
        }
    }
}

async function kaching() {
    console.log(chalk.whiteBright("Ka-ching! ^_^"));
    await sound.play(path.join(__dirname, "4kVTqUxJYBA.mp3"));
}

init();
