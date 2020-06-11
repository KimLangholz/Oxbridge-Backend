/**
 * This is the RaceLog model. 
 * It takes in a raceId, teamId and as many coordinates as you wish.
 */
module.exports = mongoose => {

    // Creating a specific schema for the Coordinates according to the GeoJSON/MongoDB specifications.
    var GeoPointSchema = new mongoose.Schema(
        {
            loc: {
                type: { type: String },
                coordinates: []
            }
        },
        {
            timestamps: false,
            versionKey: false
        }
    );

    // Creating an index for the GeoPointSchema that allows us to calculate based on the curvature of the earth.
    GeoPointSchema.index({ loc: '2dsphere' });

    // Creating a RaceLog schema.
    const RaceLogSchema = mongoose.model("RaceLog",
        mongoose.Schema(
            {
                raceId: {
                    type: Number,
                    required: true,
                    unique: false
                },
                teamId: {
                    type: Number,
                    required: true,
                    unique: false
                },
                position: [GeoPointSchema],
            },
            {
                timestamps: true,
                versionKey: false
            }
        )
    );
    return RaceLogSchema;
}