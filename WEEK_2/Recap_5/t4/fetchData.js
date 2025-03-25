//ei vaadi välttämättä tässä try catchiä, mutta olisi paras vaihtoehto!
//"FETCH IS ONLY FOR JSON DATA?!?!?! 99% the answer is json" -ile

export async function fetchData(url, options){
    const response = await fetch(url, options);

    if(!response.ok){
      throw new Error("Fetch data error. Fetch data not ok! :(");
    }

    const json = await response.json(); //get body and turn to json object
    return json;
}

