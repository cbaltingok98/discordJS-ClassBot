const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const data = require('./data.json');

client.on('ready', () => {
    console.log('ClassBot is online!');
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

            let module = parseInt(args[1]);

            if(module > 0 && module < 5)
            {
                const moduleEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Class Info')
                .addFields(
                    { name: 'Module', value: data.modules[module - 1].module },
                    { name: 'Module Closes on', value: data.modules[module - 1].last },
                    { name: 'Assignment due', value: data.modules[module - 1].assignment }
                );
                message.reply('Here you go :)');
                message.channel.send(moduleEmbed);
            } else {
                message.reply(`Module: ${module} not found/published!`);
            }

        } else {
            message.reply(`Invalid Argument: ${args[0]}`);
        }
    } else {
        message.reply(`Invalid Command: ${command}`);
    }
});

client.login(token);
