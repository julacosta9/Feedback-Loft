module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 60]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "music",
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        }
    });

    // TODO: Add association to user model
    return Project;
};
