const renderer = require('../modules/renderer');
const validator = require('../modules/validator.js');

module.exports = async function (context, req) {

    const output = req.query.output;
    const isValidOutput = renderer.isSupportedType(output);
    const isValidSource = !!(req.body);
    const content = req.body.toString('utf8');

    if (isValidOutput && isValidSource) {

        const isOutputJSON = validator.isJSON(output);
        const result = validator.validate(content, output);

        context.res = {
            status: 200,
            body: {
                isValid: true,
                details: isOutputJSON ? result.details : result
            }
        };

        if(isOutputJSON) {
            context.res.contentType = 'application/json';
        }
    }
    else {
        context.res = {
            status: 400,
            body: {
                message: 'Please provide a valid render type and article source.',
                isValid: isValidOutput && isValidSource,
                isValidRenderType: isValidOutput,
                isValidSource: isValidSource,
            }
        };
    }
};
