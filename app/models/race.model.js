/**
 * This is the Race model. 
 */
module.exports = mongoose => {

    // Creating a specific schema for the Coordinates according to the GeoJSON/MongoDB specifications.
    var GeoPointSchema = new mongoose.Schema(
        {
            type: { type: String },
            coordinates: []
        },
        {
            timestamps: false,
            versionKey: false
        }
    );

    // Creating an index for the GeoPointSchema that allows us to calculate based on the curvature of the earth.
    GeoPointSchema.index({ loc: '2dsphere' });

    // Creating a Race schema.
    var raceSchema = mongoose.Schema(
        {
            raceTitle: {
                type: String,
                required: true,
                unique: false
            },

            street: {
                type: String,
                required: true,
                unique: false
            },

            city: {
                type: String,
                required: true,
                unique: false
            },

            zipcode: {
                type: String,
                required: true,
                unique: false
            },

            country: {
                type: String,
                required: true,
                unique: false
            },

            course: [GeoPointSchema],

            maxTeams: {
                type: Number,
                required: true,
                unique: false
            },

            /*actualTeams:{
                type: Number,
                unique: false
            },*/

            startTime: {
                type: String,
                required: true,
                unique: false
            },

            finishTime: {
                type: String,
                required: false,
                unique: false
            }
        },
        {
            timestamps: true,
            versionKey: false
        }
    );
    raceSchema.index({ '$**': 'text' });
    return mongoose.model("race", raceSchema);
}