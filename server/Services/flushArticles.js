
//Importing Models
import { Article } from '../Database/Schemas';


async function flushArticles()
{
    const result = await Article.deleteMany({})
    .then(() => { console.log(`${result.deletedCount} documents from Collection Article have been deleted`)})
    .catch(error => { console.log(`Error in flushing DB: ${error}`)});

}

export default flushArticles;