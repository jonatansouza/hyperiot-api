module.exports = {
    parseAssetId(email, sharedDataId) {
        const lower = sharedDataId.toLocaleLowerCase();
        return `${email}-${lower}`.match(/[A-Za-z0-9-]/g).join('');
    }
}