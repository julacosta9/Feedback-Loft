module.exports = function (sequelize, DataTypes) {
    var Feedback = sequelize.define("Feedback", {
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [140]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 3
            }
        }
    });

    Feedback.associate = function (models) {
        // We're saying that a piece of feedback should belong to a user and a project
        // Feedback will always be tied to a user and a project due to the foreign key constraint
        Feedback.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
        });
        
        Feedback.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false,
                references: {
                    model: "Projects",
                    key: "id",
                },
            },
        });
    };

    return Feedback;
};
