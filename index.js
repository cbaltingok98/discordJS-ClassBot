const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const data = require('./data.json');

client.on('ready', () => {
    console.log('BerkBot is online!');
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
    if(!channel) return;

    const important = member.guild.channels.cache.find(channel => channel.name === 'important');
    channel.send(`Greetings ${member}, checkout ${important} first!`);
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
    if(!channel) return;

    channel.send(`So long ${member}`);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'class'){
        if(!args.length){ // No arguments
            const classEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Class Info')
                .addFields(
                    { name: 'Class', value: `${data.info.name}`, inline: true },
                    { name: 'Section', value: `${data.info.section}`, inline: true },
                    { name: 'Credit', value: `${data.info.credit}`, inline: true }
                );
            return message.channel.send(classEmbed);
        }
        if(args[0] === 'module'){
            if(!args[1]){
                return message.reply('Please specify a module. Exp: !class module 1');
            }
            let module;
            let closes;
            let due;
            let work = false;

            switch(parseInt(args[1])){
                case 1:
                    module = data.module1.module;
                    closes = data.module1.last;
                    due = data.module1.assignment;
                    work = true;
                    break;
                case 2:
                    module = data.module2.module
                    closes = data.module2.last;
                    due = data.module2.assignment;
                    work = true;
                    break;
                case 3:
                    message.reply('This module is unpublished!');
                    break;
                case 4:
                    message.reply('This module is unpublished!');
                    break;
                case 5:
                    message.reply('This module is unpublished!');
                    break;
                case 6:
                    message.reply('This module is unpublished!');
                    break;
                case 7:
                    message.reply('This module is unpublished!');
                    break;
                case 8:
                    message.reply('This module is unpublished!');
                    break;
                case 9:
                    message.reply('This module is unpublished!');
                    break;
                case 10:
                    message.reply('This module is unpublished!');
                    break;
                case 11:
                    message.reply('This module is unpublished!');
                    break;
                case 12:
                    message.reply('This module is unpublished!');
                    break;
                default:
                    message.reply(`Module: ${args[0]} not found!`);
                    break;
            }
            if(work){
                const moduleEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Class Info')
                .addFields(
                    { name: 'Module', value: module },
                    { name: 'Closes on', value: closes },
                    { name: 'Assignment due', value: due }
                );
                message.reply('Here you go :)');
                message.channel.send(moduleEmbed);
            }
        } else {
            message.reply(`Invalid Argument: ${args[0]}`);
        }
    } else {
        message.reply(`Invalid Command: ${command}`);
    }
});

client.login(token);