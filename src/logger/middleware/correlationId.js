const correlator = require('correlation-id');

module.exports = {
    setCorrelationId: (req, res, next) => {
        const providedId = getCorrelationIdFromRequest(req);

        if(typeof providedId === 'string'){
            correlator.withId(providedId, () => {
                next();
            });
        }
        else{
            correlator.withId(() => {
                next();
            });
        }
    }
};

function getCorrelationIdFromRequest(req){
    if(req.body && req.body.trigger_id){ //TODO scope this to slack command origin also
        return req.body.trigger_idl
    }
}