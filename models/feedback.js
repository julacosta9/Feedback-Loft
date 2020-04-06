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

    // TODO: Add association to user model and project model
    return Feedback;
};
