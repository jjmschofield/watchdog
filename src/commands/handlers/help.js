module.exports = {
  getHelpText: () => {
    return Promise.resolve({
      text: 'Woof! I\'m here here to keep all your domains safe. Don\'t forget to give me a biscuit for being a good boy!',
      attachments: [
        {
          title: 'help',
          text: 'Below `you` will find a list of the available commands which you can give to Watchdog',
          mrkdwn_in: [
            'text',
            'title',
          ],
        },
        {
          title: 'check',
          text: 'Below you will find a list of the available commands which you can give to Watchdog',
        },
        {
          title: 'check google.com',
          text: 'Below you will find a list of the available commands which you can give to Watchdog',
        },
        {
          title: 'watch',
          text: 'Below you will find a list of the available commands which you can give to Watchdog',
        },
      ],
    });
  },
};
