class Participant {
    name = ''; // Nome do participante
    email = ''; // Email (será usado como id)
    assetsOwner = []; // lista de assets (ids) que participante possui
    sharedData = []; // lista de assets (ids) compartilhados com o participante
}

class Asset {
    assetId = ''; //id do asset,
    name = ''; // nome do asset
    belongsTo = ''; // id do proprietario desse asset; 
    sharedWith = []; // lista dos participants autorizados
}

