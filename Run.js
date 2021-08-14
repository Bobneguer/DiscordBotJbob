const jbob = require('jbob.discord');
const client = new jbob.Client({login: 'BOT_TOKEN'});
const db = require('secure-db');
const WELCOME_CHANNEL = 'CHANNEL_ID';

client.on('runing', () => {
    console.log('Ready!');
});

// Commands...
client.on('commandCreate', async (cmd, args) => {
   const PREFIX = db.get(`${cmd.guild.getID}_prefix`) || 'BOT_PREFIX';
  
    cmd.prefix(PREFIX);
  
    switch(cmd){
      case `ping`:
        cmd.sendMessage('Pong!').then(m => {
          m.messageEdit(`${client.ping}ms.`, {timeout: 2000});
        });
      break;
        
      case `setprefix`:
        if(!args) return false;
        cmd.sendMessage(`Ok! new prefix: ${args}.`);
        db.set(`${cmd.guild.getID}_prefix`, args);
      break;
    }
});

// Guild events...
client.on('guildUpdate', (event, member) => {
  switch(event){
    case 'memberAdd':
      client.getChannel.byID(WELCOME_CHANNEL).sendMessage(`Hy, ${member.user.getUsername}! Welcome to ${member.guild.getName}.`);
    break;
  }
});

client.run();
