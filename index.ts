import {parse} from 'yaml'
import * as fs from 'fs';
import {Client} from 'discord.js';
if(!fs.existsSync('config.yaml')) {
    console.error('Error: config.yaml not found');
    process.exit(1);
}
const config = parse(fs.readFileSync('config.yaml').toString());
const bot = new Client({
    intents: 'GuildMessages',
    shards: 'auto'
})
bot.on('ready',()=>{
    console.log('Logged in as '+bot.user.username)
});
bot.on('messageCreate',message=>{
    const cont = message.content;
    const fn = config.responses.find((e: {regex: string,flag?: string})=>(new RegExp(e.regex,e.flag||'mi')).test(cont));
    if(!fn) return;
    const match = cont.match(new RegExp(fn.regex));
    const result = eval('`'+fn.response+'`'); //for ${} supports, although this is exploitable, but these codes are only accessible by the bot owner anyways.
    message.reply(result);
})
bot.login(config.token);