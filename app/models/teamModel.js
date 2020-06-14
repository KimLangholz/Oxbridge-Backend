/**
 * This is the Team model. 
 */
module.exports = mongoose => {

    var memberSchema = new mongoose.Schema({
        type: String,
        names: []
    })

    // Creating a Team schema.
    var teamSchema = mongoose.Schema(
        {
            teamName: { type: String, required: true, unique: true },
            boatName: { type: String, required: true, unique: false },
            teamMembers: [memberSchema],
        },
        {
            timestamps: false,
            versionKey: false
        }
    );
    teamSchema.index({ '$**': 'text' });
    return mongoose.model("team", teamSchema);
}
