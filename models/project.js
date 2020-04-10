module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 60],
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "music",
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
    });

    Project.associate = function (models) {
        // We're saying that a Project should belong to a User
        // A Project can't be created without a User due to the foreign key constraint
        Project.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
        });
    };
    return Project;
};
