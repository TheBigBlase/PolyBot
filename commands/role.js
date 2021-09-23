const { SlashCommandBuilder } = require('@discordjs/builders');

const permissions = [
	{
		id: '313306342985039875',
		type: 'ROLE',
		permission: true,
	},
];

await command.permissions.add({ permissions });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setRole')
		.addUserOption(option => option.setName('target').setDescription('Select a user'))	
		.addRoleOption(option => option.setName('role').setDescription('Select a role'))	
		.setDescription('Give someone a role (needs admin perm)'),
	async execute(interaction) {
		interarction.option.getUser('target').set
	},
}
