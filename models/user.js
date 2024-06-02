import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
});

const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    account_created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.TEXT, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    quiz_attended: { type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 },
    quiz_created: { type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 }
}, {
    indexes: [
        { unique: true, fields: ['email'] },
        { unique: true, fields: ['username'] }
    ]
});

export default User;