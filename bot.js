const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// الأوامر
const commands = [
  new SlashCommandBuilder()
    .setName('هوية')
    .setDescription('عرض هويتك')
    .addStringOption(option =>
      option.setName('رقم').setDescription('رقم الهوية').setRequired(true)
    )
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ تم تحديث الأوامر');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`✅ البوت شغال: ${client.user.tag}`);
  client.user.setActivity('نظام ابشر المياااااو 🪪', { type: 'WATCHING' });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'هوية') {
    const raqam = interaction.options.getString('رقم');

    const embed = new EmbedBuilder()
      .setTitle('🪪 نظام ابشر المياااااو')
      .setColor('#0099FF')
      .setDescription(`
**الاسم:** محمد
**رقم الهوية:** ${raqam}
**الحالة:** مواطن مياااو 😸
      `)
      .setThumbnail('https://media.giphy.com/media/JIY2FDcpo3Jj2/giphy.gif');

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);