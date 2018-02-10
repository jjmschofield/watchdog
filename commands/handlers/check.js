const fetch = require('isomorphic-fetch');

module.exports = {
    doCheck: async (commandArgs) => {
        const domain = commandArgs[0];

        if(typeof domain === 'string'){ //Test the provided domain
            try{
                const fetchResult = await fetchDomain(domain);

                const result = {
                    title: ':dog: WOOF WOOF!',
                    text: 'I :heart: you so much! Can I have a biscuit now?',
                    attachments:[
                        {
                            title: domain,
                            title_link: `https:// ${domain}`,
                            fields:[
                                checkStatusIsOK(fetchResult)
                            ]
                        }
                    ]
                };

                return result;

            }
            catch(error){
                return Promise.reject(error);
            }
        }
        else{ // Test watched domains
            return;
        }
    }
};

function fetchDomain(domain){
    return fetch('https://' + domain);
}

function checkStatusIsOK(fetchResult){
    const result = {
      title: 'HTTPS Status Check',
      short: true
    };

    if(fetchResult.ok === true){
        result.value = `:white_check_mark: ${fetchResult.status}`;
     }
     else{
        result.value = `:rotating_light: ${fetchResult.status}`;
     }

     return result;
}