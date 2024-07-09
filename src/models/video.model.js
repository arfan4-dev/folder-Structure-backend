import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,

    },
    duration: {
        type: Number,
        required: true


    },
    views: {
        type: Number,
        default: 0
    }
    ,
    isPublished: {
        type: Boolean,
        default: true

    },
    thumbnail: {
        type: String, // cloudaniry Url,
        required: true

    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videoFile: {
        type: String, // cloudaniry Url
        required: true
    }
    ,

}, { timestamps })

videoSchema.plugin(mongooseAggregatePaginate)
const Video = mongoose.model("Video", videoSchema);
export { Video }