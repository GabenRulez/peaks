const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Expedition = require('./expedition');
    const ExpeditionInvite = require('./expeditionInvite');
    const Chat = require('./chat');
    const Track = require('./track');
    const UserAchivement = require('./userAchivement');

    return {
      authoredExpeditions: {
        relation: Model.HasManyRelation,
        modelClass: Expedition,
        join: {
          from: 'users.id',
          to: 'expeditions.authorId',
        },
      },
      participatedExpeditions: {
        relation: Model.ManyToManyRelation,
        modelClass: Expedition,
        join: {
          from: 'users.id',
          through: {
            from: 'tracks.userId',
            to: 'tracks.expeditionId',
          },
          to: 'expeditions.id',
        },
      },
      sentExpeditionInvites: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionInvite,
        join: {
          from: 'users.id',
          to: 'expeditionInvites.fromId',
        },
      },
      receivedExpeditionInvites: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionInvite,
        join: {
          from: 'users.id',
          to: 'expeditionInvites.toId',
        },
      },
      chats: {
        relation: Model.ManyToManyRelation,
        modelClass: Chat,
        join: {
          from: 'users.id',
          through: {
            from: 'userChats.userId',
            to: 'userChats.chatId',
          },
          to: 'chats.id',
        },
      },
      tracks: {
        relation: Model.HasManyRelation,
        modelClass: Track,
        join: {
          from: 'users.id',
          to: 'tracks.userId',
        },
      },
      achivements: {
        relation: Model.HasManyRelation,
        modelClass: UserAchivement,
        join: {
          from: 'users.id',
          to: 'userAchivements.userId',
        },
      },
    };
  }
}

module.exports = User;
