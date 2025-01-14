import { Article } from "../Database/Schemas.js";

async function get5Articles()
{
    try {
        const randomArticles = await Article.aggregate([
            { $sample: {size: 5} }
        ]);

        return randomArticles;
    }
    catch (error)
    {
        console.log(`ERROR in retrieveing Articles: ${error}`);

        return [];
    }
}

export default get5Articles;