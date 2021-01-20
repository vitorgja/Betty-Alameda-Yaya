import { DB } from '../config/database'; 

export class StatusModel {
    getStatusToday() {
        return DB.client.query(DB.STATUS_READY)
            .then()
        // (description, status, channel, channelid , channeltype ) values ('teste', true, 'teste', '12345', 'texto');
    };
    
    insert (descricao, channel, channelID, channelType) {
        return DB.client.query(DB.STATUS_ADD, [descricao, channel, channelID, channelType]);
    }
}