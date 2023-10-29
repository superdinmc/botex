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
    const fn 
})
bot.login(config.token);