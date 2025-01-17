
//Importing Models
import {Article, User} from '../Database/Schemas.js';


async function flushArticles()
{
    try {
        const result = await Article.deleteMany({});
        console.log(`${result.deletedCount} documents from Collection Article have been deleted`);
    }
    catch (error) {
        console.log(`Errpr in flushing DB: ${error}`);
    }
}

export default flushArticles;