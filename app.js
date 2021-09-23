const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const settings = require('./settings.json');
const chalk = require('chalk');
//const {promisify, addListener} = require('util');


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) { //load all commands 
	if(!file.endsWith(".js")) return; //use only js files 
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
};


client.on('ready', async() => {
	try{
		console.log(chalk.cyan("It's alive ! "));
}
	catch(err) {
	console.log(chalk.bgRed("Error in app.js : Init : ", err));
}});


//client.on('message', async message => {
//    let terminal = false;
//    if (message.author.bot) return;
//
//        message.content = message.content.toLowerCase();
//        args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
//        const calledCommand = args.shift();
//
//    if (!message.content.startsWith(settings.prefix)) return;
//
//    if(!client.commands.get(calledCommand)) return;
//
//    client.commands.get(calledCommand).run(message, client, args, terminal, null);
//});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(settings.token);
