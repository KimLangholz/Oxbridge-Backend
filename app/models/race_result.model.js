/**
 * This is the Result model. 
 */
module.exports = mongoose => {


    // Creating a Result schema.
    var resultSchema = mongoose.Schema(
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
            
            startTime: {
                type: Date,
                required: true,
                unique: false
            },
        
            finishTime: {
                type: Date,
                required: true,
                unique: false
            },
            
            result:{
                type: Number,
                required: true,
                unique: false
            },
        },
        {
            timestamps: true,
            versionKey: false
        }
    );

    return mongoose.model("raceResults", resultSchema);
}